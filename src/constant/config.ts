const ConfigData = {
		phq: {
				accessToken: `${process.env.REACT_APP_PHQ_TOKEN}`,
				apiUrl : `${process.env.REACT_APP_PHQ_APP_URL}`
		},
		apiUrl: `${process.env.REACT_APP_API_RUL}${process.env.REACT_APP_API_VERSION}`,
		apiName: {
			login: 'auth/login/',
			signup: 'auth/signup/',
			logout: 'auth/logout/',
			emailVerify: 'account/email-verify/',
			adminUsers: 'admin/users/',
			changeStatus: 'admin/users/change-status/',
			changePassword: '/account/change-password/',
			forgotPassword: '/account/forgot-password/',
			resetPassword: '/account/set-password/',
			verifyCode: '/account/verify-code/',
			category: '/util/category',
			profile: '/account/profile/'
		}
	};

	export default ConfigData;

