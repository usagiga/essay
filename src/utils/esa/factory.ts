import EsaAPIClient from './api-client';
import EsaClient from './client';
import EsaStubClient from './stub-client';

export const client: EsaClient = (() => {
  const nodeEnv = process.env.NODE_ENV;

  // if nodeEnv is development or test
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    return new EsaStubClient();
  }

  // if nodeEnv is production
  const teamName = process.env.ESA_TEAM_NAME ?? 'example';
  const apiKey = process.env.ESA_TEAM_NAME ?? 'example';
  const host = process.env.JSON_SERVER_HOST ?? 'example.com';
  const port = process.env.JSON_SERVER_PORT ?? '443';
  const apiOrigin = `${host}:${port}`;

  return new EsaAPIClient(teamName, apiKey, apiOrigin);
})();

export default client;
