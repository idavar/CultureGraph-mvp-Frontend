import React from 'react';

import Header from './Header';
import Footer from './Footer';

import { apiReq } from '../../helpers';
import { Messages } from '../../constant/messages';
import Common from '../../constant/common';

interface Props {
		location: {
				search: string
		};
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

	emailVerify (email_hash_code: string | null) {
		apiReq.emailVerify({ email_hash_code }).then(response => {
			if (response.status === Common.status.success || response.status === Common.status.processed) {
				this.setState({message: response.data.detail});
			} else {
				this.setState({message: response.data.detail});
			}
		}).catch(err => {
			const resData = err.response.data;
			if (resData.detail) {
				this.setState({message: resData.detail});
			 } else {
				const message = resData['error']['email_hash_code'][Common.zero] || Messages.error.somethingWrong;
				this.setState({ message });
			}
		});
	}

	render() {
		return (
		<div>
			<Header />
			<div>
				{this.state.message}
			</div>
			<Footer />
		</div>
		);
	}
}

export default EmailVerify;
