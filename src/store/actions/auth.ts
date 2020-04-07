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

const handleError = (err: Error) => {
	if (err) {
		let msg = err['detail'];
		if (!msg)  {
			msg = validateRef.getObjectFirstKeyValue(err['error']);
		}
		ToastError({msg});
	}
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
								handleError(err.response.data);
								dispatch(authFail(err.response.data));
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
				const user = session.getUserData();
				if (!Object.keys(user).length) {
						dispatch(logout());
				} else {
						dispatch(authSuccess(user));
				}
		};
};



