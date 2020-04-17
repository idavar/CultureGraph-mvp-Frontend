import React from 'react';
import { History } from 'history';

import { ToastSuccess, ToastError } from '../Alert/Toast';
import { apiReq } from '../../helpers';
import { Messages } from '../../constant/messages';
import Common from '../../constant/common';


interface Props {
		location: {
				search: string
		};
		history: History;
}
interface StateInterface {
	message: string;
}

class EmailVerify extends React.Component<Props, StateInterface> {
		constructor(props: Props) {
				super(props);
				this.state = {
					message: ''
				};
				const params = new URLSearchParams(this.props.location.search);
				if (params.get('token')) {
					this.emailVerify(params.get('token'));
				}
	}

	emailVerify (emailHashCode: string | null) {
		apiReq.emailVerify({ email_hash_code: emailHashCode }).then(response => {
			if (response.status === Common.status.success || response.status === Common.status.processed) {
				this.setState({message: response.data.detail});
				ToastSuccess({msg: response.data.detail});
			} else {
				this.setState({message: response.data.detail});
				ToastError({msg: response.data.detail});
			}
			this.props.history.push('/login');
		}).catch(err => {
			const resData = err.response.data;
			if (resData.detail) {
				this.setState({message: resData.detail});
				ToastError({msg: resData.detail});
			 } else {
				const message = resData['error']['email_hash_code'][Common.zero] || Messages.error.somethingWrong;
				this.setState({ message });
				ToastError({msg: message});
			}
			this.props.history.push('/login');
		});
	}

	render() {
		return (
		<div></div>
		);
	}
}

export default EmailVerify;
