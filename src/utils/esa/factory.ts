import EsaAPIClient from './api-client';
import EsaClient from './client';
import EsaStubClient from './stub-client';

export const client: EsaClient = (() => {
  const useEsaApiStub = process.env.USE_ESA_API_STUB ?? '';
  if (useEsaApiStub === 'true') {
    return new EsaStubClient();
  }

  // if nodeEnv is production
  const teamName = process.env.ESA_TEAM_NAME ?? 'example';
  const apiKey = process.env.ESA_API_KEY ?? 'example';
  const host = process.env.ESA_API_HOST ?? 'example.com';
  const port = process.env.ESA_API_PORT ?? '443';
  const apiOrigin = `${host}:${port}`;

  return new EsaAPIClient(teamName, apiKey, apiOrigin);
})();

export default client;
