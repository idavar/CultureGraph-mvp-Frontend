import React from 'react';
import AdminHeader from '../../../components/common/AdminHeader';
import ApprovedUserList from './ApprovedUserList';
import UserRequestList from './UserRequestList';

import Common from '../../../constant/common';

interface ManageUserProps {
	location: {
			search: string;
	};
}
interface UserStateInterface {
	viewType: string | null;
}

class ManageUsers extends React.Component<ManageUserProps, UserStateInterface> {
	constructor(props: ManageUserProps) {
		super(props);
		this.state = {
			viewType: Common.actionType.verified
		};
	}

	getQueryParms() {
		const params = new URLSearchParams(this.props.location.search);
		if (params.get('viewType')) {
			this.setState({viewType: params.get('viewType')});
		}
	}

	fetchUserList() {
		//
	}

	render() {
		let userListView = <ApprovedUserList />;
		if (this.state.viewType === Common.actionType.request) {
			userListView = <UserRequestList />;
		}
		return (
		<div>
			<AdminHeader />
			<div className='user-list'>
				{userListView}
			</div>
		</div>);
	}
}

export default ManageUsers;
