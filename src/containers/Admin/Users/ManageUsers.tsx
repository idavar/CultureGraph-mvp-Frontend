import React from 'react';
import AdminHeader from '../../../components/common/AdminHeader';

class ManageUsers extends React.Component {
	render() {
		return (
		<div>
			<AdminHeader />
			<div className='user-list'>
				Manage Users
			</div>
		</div>);
	}
}

export default ManageUsers;
