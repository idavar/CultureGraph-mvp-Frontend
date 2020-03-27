import axios from 'axios';
import ConfigData from '../constant/config';

interface ApiData {type: string; name: string; }
export const apiCall = async (apiInfo: ApiData, data = {}, options: any) => {
		const deviceId = '';
		return new Promise((resolve, reject) => {
				const axiosObj: any = getAxiosObj(apiInfo, data, deviceId);
				const params = options['params'];
				if (params && params.length) {
						axiosObj['url'] = `${axiosObj['url']}/${params.join('/')}`;
				}
				if (options.query) {
						axiosObj['url'] = `${axiosObj['url']}${options.query}`;
				}
				return axios(axiosObj)
						.then((res: any) => {
								const resData = res['data'];
								if (resData['status'] === true || res['status'] === 204) {
										resolve(resData);
										const result = resData['result'];
										result['message'] = resData['message'];


								} else {
										resData['isAPIErr'] = true;
										reject(resData);
								}
						})
						.catch((err: any) => {
								reject(err);
						});
		});
};

const getAxiosObj = (apiInfo: ApiData, data: object, deviceId: string) => {
		const server = process.env.REACT_APP_BASE_URL;
		const userData = '';
		const obj = {
				method: apiInfo['type'],
				baseURL: server,
				url: apiInfo['name'],
				data: data,
				headers: {
						'Content-Type': 'application/json;charset=utf-8',
						'device-id': deviceId,
						'Authorization': ''
				}
		};
		userData && (obj['headers']['Authorization'] = `Bearer${userData['token']}`);
		userData && (obj['headers']['device-id'] = deviceId);
		return obj;
};

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
