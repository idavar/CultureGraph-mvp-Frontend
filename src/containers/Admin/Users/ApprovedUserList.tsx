import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import { UserData } from '../../../interface/UserData';
import Common from '../../../constant/common';

interface UserListProps {
	users: UserData[];
	count: number;
	page: number;
	fetchUserList: any;
}

class ApprovedUserList extends React.Component<UserListProps> {
	constructor(props: UserListProps) {
		super(props);
		this.state = {};
		}
	render() {
				const active = this.props.page;
				const items = [];
				const totalPage = Math.ceil(this.props.count / Common.pageLimit);
				for (let pn = Common.one; pn <= totalPage; pn++) {
				items.push(
				<Pagination.Item onClick={() => { this.props.fetchUserList({page: pn}); }} key={pn} active={pn === active}>
						{pn}
				</Pagination.Item>,
				);
				}
				const paginationBasic = (
						<div>
							<Pagination>{items}</Pagination>
						</div>
				);
		return (<div>
	<div className='list-header'>
				<div className='list-left'><h1>Manage Users ({this.props.count})</h1></div>
				<div className='list-right'>
				<Form>
				<span>Sort Users</span>
				<Dropdown>
						<Dropdown.Toggle id='dropdown-basic'>
								All Users
						</Dropdown.Toggle>
						<Dropdown.Menu>
								<Dropdown.Item href='#'>Active Users</Dropdown.Item>
								<Dropdown.Item href='#'>Block Users</Dropdown.Item>
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
			<th>Added On</th>
			<th>User Status</th>
		</tr>
	</thead>
	<tbody>{
	this.props.users.map((doc, index) => (<tr key={index}>
			<td>{doc.first_name}</td>
			<td>{doc.email}</td>
			<td>{doc.company}</td>
			<td>{doc.created_at}</td>
			<td>
				<Form>
					<Form.Check
							type='switch'
							id='custom-switch'
							label='Active'
					/>
				</Form>
			</td>
		</tr>))
		}
	</tbody>
</Table>
{paginationBasic}
				</div>);
	}
}

export default ApprovedUserList;
