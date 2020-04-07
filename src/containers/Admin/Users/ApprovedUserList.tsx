import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { UserData } from '../../../interface/UserData';
import { UserListProps } from '../../../interface/UserListProps';
import Common from '../../../constant/common';

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
			<div className='custom-container'>
			<div className='list-header'>
		<h1>Manage Users {this.props.count ? `(${this.props.count})` : ''}</h1>
				<Form>
				<span className='sort-user-title'>Sort Users</span>
				<div className='form-group sort-user'>
					<select className='form-control'>
						<option>All Users</option>
						<option>Active Users</option>
						<option>Block Users</option>
					</select>
					<img  src='/assets/images/caret-down-light.png' alt='Caret Icon' />
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
	<tbody>{
	this.props.users.map((doc: UserData, index: number) => (<tr key={index}>
			<td>{doc.first_name}</td>
			<td>{doc.email}</td>
			<td>{doc.company}</td>
			<td>{doc.created_at}</td>
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
