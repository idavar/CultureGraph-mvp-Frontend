const ConfigData = {
		phq: {
				accessToken: '1L20H4u91D4Cgj9INgfWqvhbfi8hSf07bOfoLONO',
				apiUrl : 'https://api.predicthq.com/v1/events'
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
			forgotPassword: '/account/forgot-password/'
		}
	};

	export default ConfigData;

