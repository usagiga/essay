import RateLimit from "./types/rate-limit";
import { pageNation } from "./types/page-nation";
import { errorResponse, implementsErrorResponse } from "./types/error-response";
import { getPostResponse, post } from "./types/post";

/* eslint-disable no-await-in-loop */

// fetcher is for HOF
type fetcher<T> = (url: URL, init?: RequestInit) => Promise<typedFetchResponse<T>>;

type typedFetchResponse<T> = {
  body: T | errorResponse
  statusCode: number
  rateLimit: RateLimit
};

export default class EsaAPIClient {
  readonly teamName: string;
  readonly apiKey: string;
  readonly apiOrigin: URL;

  getPostCache = new Map<string, post[]>();

  // TODO : Implement error handling
  // - Retry with 429, 500
  // - Abort with 400, 401, 402, 403, 404, 405, 406
  // - Show error
  //
  // esa.io API returns 200, 201, 204, 400, 401, 402, 403, 404, 405, 406, 429, 500.
  // readonly successStatusCodes = [200, 201, 204] as const;
  // readonly retrySoonStatusCodes = [429];
  // readonly retryLaterStatusCodes = [500];
  // readonly abortStatusCodes = [400, 401, 402, 403, 404, 405, 406];
  // readonly numOfRetry = 5;

  constructor(teamName: string, apiKey: string, apiOrigin = "https://api.esa.io") {
    this.teamName = teamName;
    this.apiKey = apiKey;
    this.apiOrigin = new URL(apiOrigin);
  }

  // High order fetcher to negotiate page nation
  withPageNation = <T extends pageNation>(rawFetcher: fetcher<T>): (url: URL, init?: RequestInit) => Promise<T[]> =>
    (url, init) => new Promise<T[]>((resolve, reject) => {
      const result: T[] = [];

      (async () => {
        let nextPage: number | null = 1;

        while (nextPage) {
          // Populate path
          url.searchParams.set("per_page", "100");
          url.searchParams.set("page", `${nextPage}`);

          const page = await rawFetcher(url, init).catch(e => e as Error);
          if (page instanceof Error) throw page;
          if (implementsErrorResponse(page.body)) throw page.body;

          result.push(page.body);

          await page.rateLimit.waitForReset();
          nextPage = page.body.next_page;
        }
      })().then(_ => resolve(result)).catch(e => reject(e));
    });

  withAuthentication = <T>(rawFetcher: fetcher<T>): fetcher<T> =>
    (url, init) => {
      const newInit = init || {};
      newInit.headers = {
        "Authorization": `Bearer: ${this.apiKey}`
      };

      return rawFetcher(url, newInit);
    };

  typedFetch = <T>(url: URL, init?: RequestInit): Promise<typedFetchResponse<T>> => {
    let response: Response;

    return fetch(url.href, init)
      .then(res => {
        response = res;

        return res.json() as Promise<T | errorResponse>;
      })
      .then(json => ({
          body: json,
          statusCode: response.status,
          rateLimit: new RateLimit(response)
        }) as typedFetchResponse<T>
      )
      .catch(e => {
        throw e;
      });
  };

  // Get all posts
  public getPosts = async (query= ''): Promise<post[]> => {
    // If hit, return cache
    const cache = this.getPostCache.get(query);
    if (cache !== undefined && cache !== null) {
      return cache;
    }

    // Populate path
    const url = new URL(`/v1/teams/${this.teamName}/posts`, this.apiOrigin);
    if (query) {
      url.searchParams.set("q", query);
    }

    // Get all posts
    const postResponses = await this.withPageNation<getPostResponse>(
      this.withAuthentication<getPostResponse>(
        this.typedFetch
      )
    )(url).catch(e => e as Error);

    if (postResponses instanceof Error) throw postResponses;

    // Transform posts as result
    const resSum = postResponses.reduce(
      (prev, res) => {
        res.posts.push(...prev.posts);

        return res;
      });

    // Store posts as cache
    this.getPostCache.set(query, resSum.posts);

    return resSum.posts;
  };
}
