import axios from 'axios';
import { store } from '../store/store';
import { ToastError } from '../components/Alert/Toast';
import * as actions from '../store/actions/index';
import ConfigData from '../constant/config';
import * as session from '../store/actions/session';
import { pageReload } from '../store/utility';
import Common from '../constant/common';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
		return request;
}, error => {
		return Promise.reject(error);
});
const {dispatch} = store; // direct access to redux store.
axios.interceptors.response.use(response => {
		return response;
}, error => {
		if (error.response.status === Common.status.authentication ||
			error.response.status === Common.status.noPermission) {
			ToastError({msg: error.response.data.detail});
			dispatch(actions.logout() as never);
			setTimeout(() => {
				pageReload();
			}, Common.pageTimeout);
			return;
		} else {
			return Promise.reject(error);
		}
});

export const apiPost = (url: string, data: object) => axios.post(url, data);

export const apiPatch = (url: string, data: object) => axios.patch(url, data, { headers: { Authorization: `Bearer ${session.getToken()}` }});

export const apiSecurePost = (url: string, data: object) => axios.post(url, data, { headers: { Authorization: `Bearer ${session.getToken()}` }});

export const apiGet = (url: string, data: object) => axios.get(url, { headers: { Authorization: `Bearer ${session.getToken()}` }, ...data});

export const predicthqApiCall = async (data = {}, options?) => {
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
						.then((res) => {
								const resData = res['data'];
								resolve(resData);
						})
						.catch((err) => {
								reject(err);
						});
		});
};

const getPredicthqObj = (data: object) => {
		const server = process.env.REACT_APP_BASE_URL;
		return {
				baseURL: server,
				url: ConfigData.phq.apiUrl,
				data,
				headers: {
						'Accept': 'application/json',
						'Authorization': `Bearer ${ConfigData.phq.accessToken}`
				}
		};
};
