import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ActionModal from './ActionModal';
import { UserData } from '../../../interface/UserData';
import { UserListProps } from '../../../interface/UserListProps';
import Common from '../../../constant/common';

interface RequestState {
		isShow: boolean;
}

class UserRequestList extends React.Component<UserListProps, RequestState> {
		modalRef = React.createRef<ActionModal>();
		private status = `${Common.requestStatus.pending},${Common.requestStatus.rejected}`;
		constructor(props: UserListProps) {
		super(props);
		this.state = {
			isShow: true
				};
			this.submitSearch = this.submitSearch.bind(this);
		}

		onAcceptReject = (data: UserData, requestAction: string) => {
				if (this.modalRef.current) {
						this.modalRef.current.openModal(data, requestAction);
				}
		}

		submitSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			console.log(e.target.value);
		}

	render() {
			const active = this.props.queryData.page;
			const items = [];
			const totalPage = Math.ceil(this.props.count / Common.pageLimit);
			for (let page = Common.one; page <= totalPage; page++) {
			items.push(
			<Pagination.Item onClick={() => { this.props.fetchUserList({page: page}); }} key={page} active={page === active}>
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
					<select className='form-control' name='status' onChange={this.submitSearch}>
						<option value={this.status}>All Request</option>
						<option value={Common.requestStatus.pending}>Pending Request</option>
						<option value={Common.requestStatus.rejected}>Rejected Request</option>
					</select>
					<img  src='/assets/images/caret-down-light.png' alt='Caret Icon' />
				</div>
				<Form.Group controlId='searchUser'>
				<Form.Label>Search Here</Form.Label>
				<Form.Control type='text' className='search-user' placeholder='Search Here' name='query'
				 onChange={this.submitSearch} />
				<span className='search-icon'><img className='logo' src='/assets/images/search-icon.png' alt='Search Icon' /></span>
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
