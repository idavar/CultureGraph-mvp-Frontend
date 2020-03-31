import { apiHandler } from '../helpers';
import ConfigData from '../constant/config';

export const predicthqSearchEvent = (data: object, options?: object) => apiHandler.predicthqApiCall(data, options);

export const signIn = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.login}`, data);

export const signUp = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.signup}`, data);

