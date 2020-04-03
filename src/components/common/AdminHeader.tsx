import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import Common from '../../constant/common';
import * as actions from '../../store/actions/index';

class AdminHeader extends React.Component<HeaderProps> {
	render() {
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<a href='/'>Manage Users</a>
				<a href='/'>Manage Request</a>
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
	return {
			isAuthenticated: !!state.auth.token,
			isAdmin: state.auth.group === Common.group.admin,
			full_name: state.auth.full_name
	};
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
			onLogout: () =>  dispatch(actions.logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
