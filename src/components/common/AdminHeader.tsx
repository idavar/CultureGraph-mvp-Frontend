import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import { setDataRef } from '../../helpers';
import * as actions from '../../store/actions/index';
import Common from '../../constant/common';

class AdminHeader extends React.Component<HeaderProps> {
	render() {
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<a href='/'>Manage Users</a>
				<a href={`/admin/manage-users?viewType=${Common.actionType.request}`}>Manage Request</a>
				<div className='menu-log'>
					<Link to='#'>{this.props.full_name}</Link>
					<Link to='#'>Change Password</Link>
					<Link to='#' onClick={this.props.onLogout}>Logout</Link>
				</div>
			</div>
		</div>
		);
	}
}
function mapStateToProps(state: {auth: User}) {
	return setDataRef.setAuthDataObject(state);
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
			onLogout: () =>  dispatch(actions.logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
