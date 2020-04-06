import { apiHandler } from '../helpers';
import ConfigData from '../constant/config';

export const predicthqSearchEvent = (data: object, options?: object) => apiHandler.predicthqApiCall(data, options);

export const signIn = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.login}`, data);

export const signUp = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.signup}`, data);

export const emailVerify = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.emailVerify}`, data);

export const adminUserSearch = (data: {query: string}) => apiHandler.apiGet(`${ConfigData.apiUrl}${ConfigData.apiName.adminUsers}${data.query}`, {});
