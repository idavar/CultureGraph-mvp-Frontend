import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
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

			<div className='custom-container'>
			<div className='list-header'>
			  <h1>Manage Users (120)</h1>
				
				<Form>
				<span className='sort-user-title'>Sort Users</span>
				<div className='form-group'>
					<select className='form-control sort-user'>
						<option>test</option>
						<option>test</option>
						<option>test</option>
					</select>
				</div>
				<Form.Group controlId='searchUser'>
				<Form.Label>Search Here</Form.Label>
				<Form.Control type='text' className='search-user' placeholder='Search Here' />
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
			<td>	</td>
		</tr>

	
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
