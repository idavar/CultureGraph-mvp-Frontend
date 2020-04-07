import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
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
		constructor(props: UserListProps) {
		super(props);
		this.state = {
			isShow: true
				};
		}

		onAcceptReject = (data: UserData, requestAction: string) => {
				if (this.modalRef.current) {
						this.modalRef.current.openModal(data, requestAction);
				}
		}

	render() {
			const active = this.props.page;
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
<div className='list-header'>
							<div className='list-left'><h1>Manage Request ({this.props.count})</h1></div>
							<div className='list-right'>
									<Form>
									<span>Sort Users</span>
									<Dropdown>
											<Dropdown.Toggle id='dropdown-basic'>
													All Request
											</Dropdown.Toggle>
											<Dropdown.Menu>
													<Dropdown.Item href='#'>Pending Request</Dropdown.Item>
													<Dropdown.Item href='#'>Rejected Request</Dropdown.Item>
											</Dropdown.Menu>
											</Dropdown>
									<Form.Group controlId='searchUser'>
									<Form.Label>Search Here</Form.Label>
									<Form.Control type='text' placeholder='Search Here' />
									</Form.Group>
									</Form>
									</div>
							</div>
						<Table responsive>
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
						<tbody>{
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
											{paginationBasic}
				</div>);
	}
}

export default UserRequestList;
