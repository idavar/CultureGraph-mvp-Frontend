import React from 'react';
import Moment from 'react-moment';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { UserData } from '../../../interface/UserData';
import { UserListProps } from '../../../interface/UserListProps';
import Common from '../../../constant/common';
import { SearchQuery } from './../../../interface/SearchQuery';


interface ApprovedUserState {
	search: string;
	is_active: string;
}

class ApprovedUserList extends React.Component<UserListProps, ApprovedUserState> {
	public queryData: SearchQuery = Common.defaultQueryData;
	public firstName = 'first_name';
	public email = 'email'
	public createdAt = 'created_at';
	public company = 'company';
	constructor(props: UserListProps) {
		super(props);
		this.state = {
			search: '',
			is_active: ''
		};
		this.submitSearch = this.submitSearch.bind(this);
	}

	componentDidMount () {
		setTimeout(() => {
			this.setState({search: this.queryData.search ? this.queryData.search : ''});
			this.setState({is_active: this.queryData.is_active ? this.queryData.is_active : ''});
		}, Common.zero);
	}

	sortUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const is_active = e.target.value;
		this.setState({is_active});
		this.queryData.is_active = is_active;
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
		if (e.key === 'Enter') {
			this.submitSearch();
		}
		this.queryData.page = Common.one;
		return;
	}

	onOrderChange = (order: string) => {
		this.queryData.ordering = order;
		this.submitSearch();
	}

	submitSearch = () => {
		const searchUrl = `/admin/manage-users/`;
		let searchQuery = `?page=${this.queryData.page}&status=${Common.requestStatus.approved}`;
		if (this.queryData.is_active) {
			searchQuery = `${searchQuery}&is_active=${this.queryData.is_active}`;
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
				for (let pn = Common.one; pn <= totalPage; pn++) {
				items.push(
				<Pagination.Item onClick={() => { this.onPageClick(pn); }} key={pn} active={pn === active}>
						{pn}
				</Pagination.Item>,
				);
				}
				const paginationBasic = (
						<div>
							<Pagination>
							{(totalPage > Common.one) ? <small className='panination-prev'><Pagination.Prev disabled={!this.props.previous} onClick={() => { this.onPageClick(active - 1); }} /> </small>: ''}
								{items}
							{(totalPage > Common.one) ? <small className='panination-next'><Pagination.Next disabled={!this.props.next} onClick={() => { this.onPageClick(active + 1); }} /> </small>: '' }
							</Pagination>
						</div>
				);
		return (<div>
			<div className='custom-container'>
			<div className='list-header'>
		<h1>Manage Users {this.props.count ? `(${this.props.count})` : ''}</h1>
				<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); }}>
				<span className='sort-user-title'>Sort Users</span>
				<div className='form-group sort-user'>
					<select className='form-control' name='is_active' value={this.state.is_active} onChange={this.sortUser}>
						<option value=''>All Users</option>
						<option value='True'>Active Users</option>
						<option value='False'>Block Users</option>
					</select>
					<img  src='/assets/images/caret-down-light.png' alt='Caret Icon' />
				</div>
				<Form.Group controlId='searchUser'>
				<Form.Label>Search Here</Form.Label>
				<Form.Control type='text' className='search-user' placeholder='Search Here'
				 value={this.state.search} onChange={this.enterText} onKeyDown={this.onEnter} name='search'/>
				<span className='search-icon' onClick={this.submitSearch}><img className='logo' src='/assets/images/search-icon.png' alt='Search Icon' /></span>
				</Form.Group>
				</Form>
		</div>

		<Table responsive className='listing-table'>
	<thead>
		<tr>
			<th>User Name <span className='sorting'	onClick={() => {this.onOrderChange((this.queryData.ordering === this.firstName) ? `-${this.firstName}` : this.firstName); }} >
				<img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
			<th>Email Id <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.email) ? `-${this.email}` : this.email); }}>
				<img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
			<th>Company Name <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.company) ? `-${this.company}` : this.company); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
			<th>Added On <span className='sorting' onClick={() => {this.onOrderChange((this.queryData.ordering === this.createdAt) ? `-${this.createdAt}` : this.createdAt); }}><img  src='/assets/images/sorting-icon.png' alt='Sorting Icon' /></span></th>
			<th>User Status</th>
		</tr>
	</thead>
	<tbody>{(!this.props.users.length && !this.props.loading) ? <tr key={Common.zero}><td className='no-record-found'
	 colSpan={Common.userColSpan}>No user record found!</td></tr> :
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
			<Form>
			<div className='toggle-switch'>
			<label className='toggleSwitch'>
			<input
					type='checkbox'
					className='toggle-switch-checkbox'
				/>
					<span>
						<span>Active</span>
						<span>Block</span>
				</span>
				<a></a>
	</label>


			</div>
						</Form>
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

export default ApprovedUserList;
