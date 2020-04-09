import React from 'react';
import { History } from 'history';
import AdminHeader from '../../../components/common/AdminHeader';
import ApprovedUserList from './ApprovedUserList';
import UserRequestList from './UserRequestList';
import Common from '../../../constant/common';
import { ManageUserState } from '../../../interface/ManageUserState';
import { apiReq } from '../../../helpers';
import { SearchQuery } from './../../../interface/SearchQuery';

interface ManageUserProps {
	location: {
			search: string;
	};
	history: History;
}


class ManageUsers extends React.Component<ManageUserProps, ManageUserState> {
	private viewType: string | null = Common.actionType.verified;
	public queryData: SearchQuery = Common.defaultQueryData;
	constructor(props: ManageUserProps) {
		super(props);
		this.state = {
			viewType: Common.actionType.verified,
			users: [],
			count: Common.zero,
			loading: false,
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

		this.queryData.viewType = this.viewType;
		this.queryData.search = this.setQueryText(params);
		this.queryData.page = Number(this.setQueryPage(params));
		this.queryData.status = this.setQueryStatus(params);
		this.queryData.is_active = this.setQueryIsActive(params);
		this.queryData.ordering = this.setQueryOrdering(params);
		this.fetchUserList();
	}

	setQueryText = (params: URLSearchParams) => {
		return params.get('search') || null;
	}

	setQueryPage = (params: URLSearchParams) => {
		return params.get('page') ? params.get('page') : Common.one;
	}

	setQueryStatus = (params: URLSearchParams) => {
		return params.get('status') || null;
	}

	setQueryIsActive = (params: URLSearchParams) => {
		return params.get('is_active') || null;
	}

	setQueryOrdering = (params: URLSearchParams) => {
		return params.get('ordering') || null;
	}

	setSearchData = () => {
		let status = `${Common.requestStatus.approved}`;
		if (this.viewType === Common.actionType.request) {
			status = `${Common.requestStatus.pending},${Common.requestStatus.rejected}`;
			if (this.queryData.status) {
				status = this.queryData.status;
			}
		}
		let searchData = `?status=${status}`;
		if (this.queryData.page) {
			searchData = `${searchData}&page=${this.queryData.page}`;
		}
		if (this.queryData.search) {
			searchData = `${searchData}&search=${this.queryData.search}`;
		}
		if (this.queryData.is_active) {
			searchData = `${searchData}&is_active=${this.queryData.is_active}`;
		}
		if (this.queryData.ordering) {
			searchData = `${searchData}&ordering=${this.queryData.ordering}`;
		}
		return searchData;
	}

	fetchUserList = (query?: string) => {
		if (!query) {
			query = this.setSearchData();
		}
		this.setState({loading: true});
		apiReq.adminUserSearch({query}).then(result => {
			this.setState({loading: false});
			if (result.status === Common.status.processed) {
				this.setState({count: result.data.count});
				this.setState({users: result.data.results});
			} else {
				this.setState({count: Common.zero});
				this.setState({users: []});
			}
		}).catch(err => {
			this.setState({loading: false});
			this.setState({count: Common.zero});
			this.setState({users: []});
		});
	}

	render() {
		let userListView = <ApprovedUserList users={this.state.users} count={this.state.count}
		 fetchUserList={this.fetchUserList} queryData={this.queryData} history={this.props.history}
		 loading={this.state.loading}/>;
		if (this.state.viewType === Common.actionType.request) {
			userListView = <UserRequestList users={this.state.users} count={this.state.count}
			 fetchUserList={this.fetchUserList} queryData={this.queryData} history={this.props.history} 
			 loading={this.state.loading} />;
		}
		return (
		<div>
			<AdminHeader viewType={this.state.viewType} />
			<div className='user-list'>
				{userListView}
			</div>
		</div>);
	}
}

export default ManageUsers;
