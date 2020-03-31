import React from 'react';
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
					apiReq.emailVerify({email_hash_code: params.get('token')}).then(response => {
						if (response.status === Common.status.success) {
							this.setState({message: Messages.success.emailverify});
						} else {
							this.setState({message: Messages.error.emailverify});
						}
					}).catch(err => {
						this.setState({message: Messages.error.emailverify});
					});
				}
		}

	render() {
		return (<div>
			{this.state.message}
			</div>);
	}
}

export default EmailVerify;
