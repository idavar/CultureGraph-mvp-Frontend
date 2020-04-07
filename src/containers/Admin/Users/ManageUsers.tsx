import React from 'react';
import AdminHeader from '../../../components/common/AdminHeader';
import ApprovedUserList from './ApprovedUserList';
import UserRequestList from './UserRequestList';
import Common from '../../../constant/common';
import { ManageUserState } from '../../../interface/ManageUserState';
import { apiReq } from '../../../helpers';

interface ManageUserProps {
	location: {
			search: string;
	};
}


class ManageUsers extends React.Component<ManageUserProps, ManageUserState> {
	private viewType: string | null = Common.actionType.verified;
	constructor(props: ManageUserProps) {
		super(props);
		this.state = {
			viewType: Common.actionType.verified,
			users: [],
			count: Common.zero,
			page: Common.one,
		};
	}

	componentDidMount () {
		this.getQueryParms();
	}

	getQueryParms() {
		const params = new URLSearchParams(this.props.location.search);
		if (params.get('viewType')) {
			this.viewType = params.get('viewType');
			this.setState({viewType: this.viewType});
		}
		this.fetchUserList();
	}

	setSearchData = (option: {page: number}) => {
		let status = `${Common.requestStatus.approved}`;
		if (this.viewType === Common.actionType.request) {
			status = `${Common.requestStatus.pending},${Common.requestStatus.rejected}`;
		}
		const searchData = `?page=${option.page}&status=${status}`;
		return searchData;
	}

	fetchUserList = (option = {page: Common.one}) => {
		const query = this.setSearchData(option);
		apiReq.adminUserSearch({query}).then(result => {
			if (result.status === Common.status.processed) {
				this.setState({count: result.data.count});
				this.setState({page: option.page});
				this.setState({users: result.data.results});
			}
		}).catch(err => {});
	}

	render() {
		let userListView = <ApprovedUserList users={this.state.users} count={this.state.count} page={this.state.page} fetchUserList={this.fetchUserList} />;
		if (this.state.viewType === Common.actionType.request) {
			userListView = <UserRequestList users={this.state.users} count={this.state.count} page={this.state.page} fetchUserList={this.fetchUserList} />;
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
