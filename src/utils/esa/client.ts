import { post } from './types/post';

export default abstract class EsaClient {
  abstract getPosts: (query?: string) => Promise<post[]>;
}
