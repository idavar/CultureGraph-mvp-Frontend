import React from 'react';

class AdminHeader extends React.Component {
	render() {
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<a href='/'>Manage Users</a>
				<a href='/culture-calendar'>Culture Calendar</a>
				<div className='menu-log'>
					<a href='/'>Change Password</a>
					<a href='/'>Logout</a>
				</div>
			</div>
		</div>
		);
	}
}

export default AdminHeader;
