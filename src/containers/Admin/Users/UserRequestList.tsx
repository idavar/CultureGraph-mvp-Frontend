import React from 'react';
import Moment from 'react-moment';
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
		public firstName = 'first_name';
		public createdAt = 'created_at';
		public updatedAt = 'updated_at';
		public company = 'company';
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
						const otherOption = {
							submitSearch: this.submitSearch,
							onPageClick: this.onPageClick,
							page: this.queryData.page,
							totalCount: this.props.count
						};
						this.modalRef.current.openModal(data, requestAction, otherOption);
				}
		}

		sortUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
			const status = e.target.value;
			this.setState({status});
			this.queryData.status = status;
			this.queryData.page = Common.one;
			this.submitSearch();
		}

		enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
			const search = e.target.value;
			this.setState({search});
			this.queryData.search = search;
			this.queryData.page = Common.one;
		}

		onPageClick = (page: number) => {
			this.queryData.page = page;
			this.submitSearch();
		}

		onEnter = (e: any) => {
			this.queryData.page = Common.one;
			if (e.key === 'Enter') {
				this.submitSearch();
			}
		}

		onOrderChange = (order: string) => {
			this.queryData.ordering = order;
			this.submitSearch();
		}

		submitSearch = () => {
			const searchUrl = `/admin/manage-users/`;
			let searchQuery = `?viewType=${this.queryData.viewType}`;
			if (this.queryData.status) {
				searchQuery = `${searchQuery}&status=${this.queryData.status}`;
			} else {
				searchQuery = `${searchQuery}&status=${this.status}`;
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
						<Pagination>
							{(totalPage > Common.one) ? <Pagination.Prev disabled={!this.props.previous} onClick={() => { this.onPageClick(active - 1); }} /> : ''}
							{items}
							{(totalPage > Common.one) ? <Pagination.Next disabled={!this.props.next} onClick={() => { this.onPageClick(active + 1); }} /> : ''}
						</Pagination>
					</div>
			);

			const AcceptReject = (props: {data: UserData}) => {
				let acceptRejectButton = null;
				if (props.data.status === Common.requestStatus.pending) {
					acceptRejectButton = (<span><Button variant='danger' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.reject); }}>Reject</Button>
				<Button variant='primary' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.accept); }}>Approve</Button></span>);
				} else if (props.data.status === Common.requestStatus.rejected) {
					acceptRejectButton = (<span><Button className='reject-disable' variant='danger'>Rejected</Button>
				<Button variant='primary' onClick={() => { this.onAcceptReject(props.data, Common.requestAction.edit); }}>Edit Status</Button></span>);
				}
				return acceptRejectButton;
			};

		return (<div>
			<ActionModal ref={this.modalRef} />
			<div className='custom-container'>
			<div className='list-header'>
			<h1>Manage Request {this.props.count ? `(${this.props.count})` : ''}</h1>
				<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); }}>
				<span className='sort-user-title'>Sort Request</span>
				<div className='form-group  sort-user'>
					<select className='form-control' name='status' value={this.state.status} onChange={this.sortUser}>
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
								<th>User Name <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.firstName) ? `-${this.firstName}` : this.firstName); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
								<th>Email Id </th>
								<th>Company Name <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.company) ? `-${this.company}` : this.company); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
								<th>Requested on <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.createdAt) ? `-${this.createdAt}` : this.createdAt); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
								<th>Updated on <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.updatedAt) ? `-${this.updatedAt}` : this.updatedAt); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
								<th>Actions </th>
							</tr>
						</thead>
						<tbody>{(!this.props.users.length && !this.props.loading) ? <tr key={Common.zero}><td colSpan={6}>No user request data found!</td></tr> :
						this.props.users.map((doc: UserData, index: number) => (<tr key={index}>
								<td>{doc.first_name}</td>
								<td>{doc.email}</td>
								<td>{doc.company}</td>
								<td>
									<Moment format={`${Common.dateFormat}`}>
											{doc.created_at}
									</Moment>
								</td>
								<td>
									<Moment format={`${Common.dateFormat}`}>
											{doc.updated_at}
									</Moment>
								</td>
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
