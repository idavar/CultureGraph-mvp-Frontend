import { apiHandler } from '../helpers';
import ConfigData  from '../constant/config';

export const predicthqSearchEvent = (data: object, options?: object) => apiHandler.predicthqApiCall(ConfigData.phq.apiUrl, data);
