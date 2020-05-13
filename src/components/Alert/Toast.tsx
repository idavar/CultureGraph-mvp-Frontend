import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Common from '../../constant/common';

toast.configure(Common.toastConfig);

/**
 * @description Function used for display toast success message
 * @param props contain message text
 */
export const ToastSuccess = (props: {msg: string}) => {
		toast.success(props.msg, {
				position: toast.POSITION.TOP_CENTER
		});
};

/**
 * @description Function used for display toast error message
 * @param props contain message text
 */
export const ToastError = (props: {msg: string}) => {
		toast.error(props.msg, {
				position: toast.POSITION.TOP_CENTER
		});
};
