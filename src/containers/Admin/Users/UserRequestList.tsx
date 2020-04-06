import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import ActionModal from './ActionModal';

interface RequestState {
		isShow: boolean;
}

class UserRequestList extends React.Component<{}, RequestState> {
		modalRef = React.createRef<ActionModal>();
		constructor(props: {}) {
		super(props);
		this.state = {
			isShow: true
				};
		}

		onAcceptReject = () => {
				if (this.modalRef.current) {
						this.modalRef.current.openModal();
				}
		}

	render() {
				const active = 2;
				const items = [];
				for (let number = 1; number <= 5; number++) {
				items.push(
				<Pagination.Item key={number} active={number === active}>
						{number}
				</Pagination.Item>,
				);
				}

				const paginationBasic = (
						<div>
							<Pagination>{items}</Pagination>
						</div>
					);

		return (<div>
			<ActionModal ref={this.modalRef} />
<div className='list-header'>
							<div className='list-left'><h1>Manage Request (120)</h1></div>
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
						<tbody>
							<tr>
								<td>Table cell</td>
								<td>Table cell</td>
								<td>Table cell</td>
								<td>Table cell</td>
								<td>Table cell</td>
											<td>
											<Button variant='danger'>Reject</Button>
											<Button variant='primary' onClick={this.onAcceptReject}>Approve</Button></td>
							</tr>
						</tbody>
					</Table>
											{paginationBasic}
				</div>);
	}
}

export default UserRequestList;
