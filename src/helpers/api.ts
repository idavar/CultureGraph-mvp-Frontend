import { apiHandler } from '../helpers';

export const predicthqSearchEvent = (data: object, options?: object) => apiHandler.predicthqApiCall(data, options);

export const signIn = (url: string, data: object) => apiHandler.apiPost(url, data);
