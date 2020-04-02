import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { apiReq } from '../../helpers';
import { User } from '../../interface/User';

export const authStart = () => {
		return {
				type: actionTypes.AUTH_START
		};
};

export const authSuccess = (data: User) => {
		return {
				type: actionTypes.AUTH_SUCCESS,
				token: data.token,
				id: data.id,
				email: data.email,
				group: data.group,
		};
};

export const authFail = (error: any) => {
		return {
				type: actionTypes.AUTH_FAIL,
				error: error
		};
};

export const logout = () => {
		localStorage.removeItem('user');
		return {
				type: actionTypes.AUTH_LOGOUT
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
								localStorage.setItem('user', JSON.stringify(response.data.data));
								dispatch(authSuccess(response.data.data));
						})
						.catch(err => {
							if (err.response && err.response.data) {
								if (err.response.data.detail) {
									dispatch(authFail(err.response.data.detail));
								} else {
									dispatch(authFail(err.response.data.error));
								}
							}
						});
		};
};


export const setAuthRedirectPath = (path: string) => {
		return {
				type: actionTypes.SET_AUTH_REDIRECT_PATH,
				path: path
		};
};

export const authCheckState = () => {
		return (dispatch: Function) => {
				const user = JSON.parse(localStorage.getItem('user') || '{}');
				if (!Object.keys(user).length) {
						dispatch(logout());
				} else {
						dispatch(authSuccess(user));
				}
		};
};

