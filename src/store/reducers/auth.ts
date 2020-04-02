import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { User } from '../../interface/User';
const initialState: User = {
		email: '',
		token: '',
		id: 0,
		group: 0,
		error: {},
		loading: false,
		authRedirectPath: '/'
};

const authStart = ( state = initialState, action: User ) => {
		return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state: User, action: User) => {
		return updateObject( state, {
				token: action.token,
				id: action.id,
				email: action.email,
				group: action.group,
				error: null,
				loading: false
			} );
};

const authFail = (state: User, action: User) => {
		return updateObject( state, {
				error: action.error,
				loading: false
		});
};

const authLogout = (state: User, action: User) => {
		return updateObject(state, initialState);
};
const setAuthRedirectPath = (state: User, action: User) => {
			return updateObject(state, { authRedirectPath: action.path });
};

const reducer = ( state = initialState, action: User ) => {
		switch ( action.type ) {
				case actionTypes.AUTH_START: return authStart(state, action);
				case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
				case actionTypes.AUTH_FAIL: return authFail(state, action);
				case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
				case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
				default:
						return state;
		}
};

export default reducer;
