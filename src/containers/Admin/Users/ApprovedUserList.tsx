import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';

class ApprovedUserList extends React.Component {
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
	<div className='list-header'>
				<div className='list-left'><h1>Manage Users (120)</h1></div>
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
	<tbody>
		<tr>
			<td>Table cell</td>
			<td>Table cell</td>
			<td>Table cell</td>
			<td>Table cell</td>
			<td><Form>
								<Form.Check
										type='switch'
										id='custom-switch'
										label='Active'
								/>
						</Form>
				</td>
		</tr>
	</tbody>
</Table>
{paginationBasic}
				</div>);
	}
}

export default ApprovedUserList;
