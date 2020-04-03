import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Common from '../../constant/common';

toast.configure(Common.toastConfig);

export const ToastSuccess = (props: {msg: string}) => {
		toast.success(props.msg, {
				position: toast.POSITION.TOP_CENTER
		});
};

export const ToastError = (props: {msg: string}) => {
		toast.error(props.msg, {
				position: toast.POSITION.TOP_CENTER
		});
};
