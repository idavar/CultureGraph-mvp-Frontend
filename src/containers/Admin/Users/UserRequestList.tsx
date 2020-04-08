import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ActionModal from './ActionModal';
import { UserData } from '../../../interface/UserData';
import { UserListProps } from '../../../interface/UserListProps';
import Common from '../../../constant/common';
import { SearchQuery } from './../../../interface/SearchQuery';

interface RequestState {
		isShow: boolean;
		search: string;
		status: string;
}

class UserRequestList extends React.Component<UserListProps, RequestState> {
	public queryData: SearchQuery = Common.defaultQueryData;
		modalRef = React.createRef<ActionModal>();
		private status = `${Common.requestStatus.pending},${Common.requestStatus.rejected}`;
		constructor(props: UserListProps) {
		super(props);
		this.state = {
			isShow: true,
			search: '',
			status: ''
			};
			this.submitSearch = this.submitSearch.bind(this);
		}

		componentDidMount () {
			this.setState({search: this.queryData.search ? this.queryData.search : ''});
			this.setState({status: this.queryData.status ? this.queryData.status : ''});
		}

		onAcceptReject = (data: UserData, requestAction: string) => {
				if (this.modalRef.current) {
						this.modalRef.current.openModal(data, requestAction);
				}
		}

		sortUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
			const status = e.target.value;
			this.setState({status});
			this.queryData.status = status;
			this.submitSearch();
		}

		enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
			const search = e.target.value;
			this.setState({search});
			this.queryData.search = search;
		}

		onPageClick = (page: number) => {
			this.queryData.page = page;
			this.submitSearch();
		}

		onEnter = (e: any) => {
			if (e.key === 'Enter') {
				this.submitSearch();
			}
		}

		submitSearch = () => {
			const searchUrl = `/admin/manage-users/`;
			let searchQuery = `?viewType=${this.queryData.viewType}`;
			if (this.queryData.status) {
				searchQuery = `${searchQuery}&status=${this.queryData.status}`;
			}
			if (this.queryData.page) {
				searchQuery = `${searchQuery}&page=${this.queryData.page}`;
			}
			if (this.queryData.search) {
				searchQuery = `${searchQuery}&search=${this.queryData.search}`;
			}
			if (this.queryData.ordering) {
				searchQuery = `${searchQuery}&ordering=${this.queryData.ordering}`;
			}
			this.props.fetchUserList(searchQuery);
			this.props.history.push(`${searchUrl}${searchQuery}`);
		}

	render() {
			const active = this.props.queryData.page;
			const items = [];
			const totalPage = Math.ceil(this.props.count / Common.pageLimit);
			for (let page = Common.one; page <= totalPage; page++) {
			items.push(
			<Pagination.Item onClick={() => { this.onPageClick(page); }} key={page} active={page === active}>
					{page}
			</Pagination.Item>,
			);
			}
			const paginationBasic = (
					<div>
						<Pagination>{items}</Pagination>
					</div>
			);

			const AcceptReject = (props: {data: UserData}) => {
				let acceptRejectButton = null;
				if (props.data.status === Common.requestStatus.pending) {
					acceptRejectButton = (<span><Button variant='danger' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.reject); }}>Reject</Button>
				<Button variant='primary' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.accept); }}>Approve</Button></span>);
				} else if (props.data.status === Common.requestStatus.rejected) {
					acceptRejectButton = (<span><Button variant='danger'>Rejected</Button>
				<Button variant='primary' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.edit); }}>Edit Status</Button></span>);
				}
				return acceptRejectButton;
			};

		return (<div>
			<ActionModal ref={this.modalRef} />
			<div className='custom-container'>
			<div className='list-header'>
			<h1>Manage Request {this.props.count ? `(${this.props.count})` : ''}</h1>
				<Form>
				<span className='sort-user-title'>Sort Request</span>
				<div className='form-group  sort-user'>
					<select className='form-control' name='status' value={this.props.queryData.status ? this.props.queryData.status : ''} onChange={this.sortUser}>
						<option value={this.status}>All Request</option>
						<option value={Common.requestStatus.pending} >Pending Request</option>
						<option value={Common.requestStatus.rejected} >Rejected Request</option>
					</select>
					<img  src='/assets/images/caret-down-light.png' alt='Caret Icon' />
				</div>
				<Form.Group controlId='searchUser'>
				<Form.Label>Search Here</Form.Label>
				<Form.Control type='text' className='search-user' placeholder='Search Here' name='search'
				 onChange={this.enterText} onKeyDown={this.onEnter} value={this.state.search} />
				<span className='search-icon' onClick={this.submitSearch}><img className='logo' src='/assets/images/search-icon.png' alt='Search Icon' /></span>
				</Form.Group>
				</Form>
		</div>

		<Table responsive className='listing-table'>
						<thead>
							<tr>
								<th>User Name</th>
								<th>Email Id</th>
								<th>Company Name</th>
								<th>Requested on</th>
								<th>Updated on</th>
											<th>Actions</th>
							</tr>
						</thead>
						<tbody>{!this.props.users.length ? <tr key={Common.zero}><td colSpan={6}>No user request data found!</td></tr> :
						this.props.users.map((doc: UserData, index: number) => (<tr key={index}>
								<td>{doc.first_name}</td>
								<td>{doc.email}</td>
								<td>{doc.company}</td>
								<td>{doc.created_at}</td>
								<td>{doc.updated_at}</td>
								<td>
								<AcceptReject data={doc}/>
								</td>
							</tr>))
						}
						</tbody>
					</Table>
			<div className='pagination-block'>
				{paginationBasic}
			</div>
			</div>
				</div>);
	}
}

export default UserRequestList;
