console.log(process.env);
const ConfigData = {
		phq: {
				accessToken: '1L20H4u91D4Cgj9INgfWqvhbfi8hSf07bOfoLONO',
				apiUrl : 'https://api.predicthq.com/v1/events'
		},
		apiUrl: `${process.env.REACT_APP_API_RUL}${process.env.REACT_APP_API_VERSION}`,
		apiName: {
			login: 'auth/login/'
		}
	};

	export default ConfigData;

