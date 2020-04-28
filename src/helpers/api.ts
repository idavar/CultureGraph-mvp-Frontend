import { apiHandler } from '../helpers';
import ConfigData from '../constant/config';

export const predicthqSearchEvent = (data: object, options?: object) => apiHandler.predicthqApiCall(data, options);

export const signIn = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.login}`, data);

export const signUp = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.signup}`, data);

export const emailVerify = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.emailVerify}`, data);

export const adminUserSearch = (data: {query: string}) => apiHandler.apiGet(`${ConfigData.apiUrl}${ConfigData.apiName.adminUsers}${data.query}`, {});

export const changeStatus = (id: number, data: object) => apiHandler.apiPatch(`${ConfigData.apiUrl}${ConfigData.apiName.changeStatus}${id}/`, data);

export const changePassword = (data: object) => apiHandler.apiSecurePost(`${ConfigData.apiUrl}${ConfigData.apiName.changePassword}`, data);

export const getProfile = (id?: number) => apiHandler.apiGet(`${ConfigData.apiUrl}${ConfigData.apiName.profile}`, {});

export const updateProfile = (data: object) => apiHandler.apiSecurePost(`${ConfigData.apiUrl}${ConfigData.apiName.profile}`, data);

export const forgotPassword = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.forgotPassword}`, data);

export const verifyCode = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.verifyCode}`, data);

export const resetPassword = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.resetPassword}`, data);

export const getCategory = () => apiHandler.apiGet(`${ConfigData.apiUrl}${ConfigData.apiName.category}`, {});

export const resendVerifyEmail = (data: object) => apiHandler.apiPost(`${ConfigData.apiUrl}${ConfigData.apiName.resendVerification}`, data);
