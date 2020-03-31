import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { apiReq } from '../../helpers';

export const authStart = () => {
		return {
				type: actionTypes.AUTH_START
		};
};

export const authSuccess = (token: string, userId: string) => {
		return {
				type: actionTypes.AUTH_SUCCESS,
				idToken: token,
				userId: userId
		};
};

export const authFail = (error: any) => {
		return {
				type: actionTypes.AUTH_FAIL,
				error: error
		};
};

export const logout = () => {
		return {
				type: actionTypes.AUTH_LOGOUT
		};
};

export const checkAuthTimeout = (expirationTime: number) => {
		return (dispatch: any) => {
				setTimeout(() => {
						dispatch(logout());
				}, expirationTime * 1000);
		};
};

export const auth = (email: string, password: string) => {
		return (dispatch: Dispatch) => {
				dispatch(authStart());
				const authData = {
						email: email,
						password: password
				};
				apiReq.signIn(authData)
						.then(response => {
								console.log(response);
								dispatch(authSuccess(response.data.idToken, response.data.localId));
						})
						.catch(err => {
								dispatch(authFail(err.response.data.error));
						});
		};
};
