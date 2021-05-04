// RateLimit is to handle X-RateLimit-* headers in response
export default class RateLimit {
  public readonly limit: number;
  public readonly remaining: number;
  public readonly resetAt: number;
  public readonly waitMsToReset: number;
  public readonly hasRateLimit: boolean;

  constructor(response: Response) {
    // Populate header
    [
      this.limit,
      this.remaining,
      this.resetAt
    ] = [
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "X-RateLimit-Reset"
    ].map(key => response.headers.get(key) ?? "").map(value => parseInt(value, 10));

    // Assign computed values
    this.waitMsToReset = this.resetAt - new Date().valueOf();
    this.hasRateLimit = !([this.limit, this.resetAt, this.resetAt].includes(NaN));
  }

  public isExceeded = (): boolean => {
    if (!this.hasRateLimit) return false;
    if (this.remaining > 0) return false;

    return this.waitMsToReset > 0;
  };

  // Generate Promise to wait for resetting if rate limit exceeded.
  // If not, it resolves now.
  //
  // @returns The Promise what resolves as of resetting the rate limit.
  public waitForReset = (): Promise<void> => new Promise<void>(
    (resolve) => {
      // If need NOT to wait, do it now
      if (!this.isExceeded()) {
        resolve();

        return;
      }

      // If need to wait, do it later
      setTimeout(() => resolve(), this.waitMsToReset);
    }
  );
}
