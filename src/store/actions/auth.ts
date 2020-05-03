import { Dispatch } from 'redux';

import { ToastError } from '../../components/Alert/Toast';
import * as actionTypes from './actionTypes';
import * as session from './session';
import { apiReq, validateRef } from '../../helpers';
import { User } from '../../interface/User';
import { Error } from '../../interface/Error';

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
				full_name: data.full_name,
				email: data.email,
				group: data.group,
		};
};

export const authFail = (error) => {
		return {
				type: actionTypes.AUTH_FAIL,
				error
		};
};
/**
 * @description function used for user logout
 */
export const logout = () => {
		localStorage.removeItem('user');
		return {
				type: actionTypes.AUTH_LOGOUT
		};
};

/**
 * @description function used for handle the api error respone
 * @param err contain error object
 */
const handleError = (err: Error) => {
	if (err) {
		let msg = err['detail'];
		if (!msg)  {
			msg = validateRef.getObjectFirstKeyValue(err['error']);
		}
		ToastError({msg});
	}
};
/**
 * @description function used for user login
 * @param email contain email field value
 * @param password contain password value
 */
export const auth = (email: string, password: string) => {
		return (dispatch: Dispatch) => {
				dispatch(authStart());
				const authData = {
						email,
						password
				};
				apiReq.signIn(authData)
						.then(response => {
								session.saveUserData(response.data.data);
								dispatch(authSuccess(response.data.data));
						})
						.catch(err => {
							if (err.response && err.response.data) {
								const dataObj = err.response.data;
								if ((dataObj.error && !dataObj.error.email_verified)) {
									handleError(err.response.data);
								}
							}
							dispatch(authFail(err.response.data));
						});
		};
};

/**
 * @description function used for set auth redirect path
 * @param path contain auth redirect url path
 */
export const setAuthRedirectPath = (path: string) => {
		return {
				type: actionTypes.SET_AUTH_REDIRECT_PATH,
				path
		};
};


/**
 * @description function used for check user already login or not
 */
export const authCheckState = () => {
		return (dispatch: Function) => {
				const user = session.getUserData();
				if (!Object.keys(user).length) {
						dispatch(logout());
				} else {
						dispatch(authSuccess(user));
				}
		};
};



