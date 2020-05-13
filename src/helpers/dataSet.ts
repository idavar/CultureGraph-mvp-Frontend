import { User } from '../interface/User';
import Common from '../constant/common';

export const setAuthDataObject = (state:  {auth: User}) => {
		return {
				isAuthenticated: !!state.auth.token,
				isAdmin: state.auth.group === Common.group.admin,
				full_name: state.auth.full_name
		};
};
