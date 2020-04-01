import axios from 'axios';
import ConfigData from '../constant/config';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export const apiPost = (url: string, data: object) => axios.post(url, data);

export const predicthqApiCall = async (data = {}, options?: any) => {
		return new Promise((resolve, reject) => {
				const axiosObj = getPredicthqObj(data);
				const params = options['params'];
				if (options.next) {
					axiosObj['url'] = options.next;
				} else {
					if (params && params.length) {
						axiosObj['url'] = `${axiosObj['url']}/${params.join('/')}`;
					}
					if (options.query) {
							axiosObj['url'] = `${axiosObj['url']}${options.query}`;
					}
				}
				return axios(axiosObj)
						.then((res: any) => {
								const resData = res['data'];
								resolve(resData);
						})
						.catch((err: any) => {
								reject(err);
						});
		});
};

const getPredicthqObj = (data: object) => {
		const server = process.env.REACT_APP_BASE_URL;
		const obj = {
				baseURL: server,
				url: ConfigData.phq.apiUrl,
				data: data,
				headers: {
						'Accept': 'application/json',
						'Authorization': `Bearer ${ConfigData.phq.accessToken}`
				}
		};
		return obj;
};
