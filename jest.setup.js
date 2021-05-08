/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// To use GlobalScope.fetch in jest
import { fetch, Headers, Request, Response } from 'whatwg-fetch';

global.fetch = fetch;
global.Request = Request;
global.Headers = Headers;
global.Response = Response;
