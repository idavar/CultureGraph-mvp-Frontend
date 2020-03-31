import React from 'react';

interface Props {
		location: {
				search: string
		};
}

class EmailVerify extends React.Component<Props> {
		constructor(props: Props) {
				super(props);
				const params = new URLSearchParams(this.props.location.search);
				const token = params.get('token');
		}

	render() {
		return (<div>
			You have successfully verified the email address.
			</div>);
	}
}

export default EmailVerify;
