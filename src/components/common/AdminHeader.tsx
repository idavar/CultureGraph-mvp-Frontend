import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ChangePassword from '../../containers/ChangePassword/ChangePassword';
import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import { setDataRef } from '../../helpers';
import * as actions from '../../store/actions/index';
import * as session from '../../store/actions/session';
import Common from '../../constant/common';
import Dropdown from 'react-bootstrap/Dropdown';

class AdminHeader extends React.Component<HeaderProps> {
	changePassRef = React.createRef<ChangePassword>();
	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			message: ''
		};
	}

	changePassword = () => {
		if (this.changePassRef.current) {
			this.changePassRef.current.changePassword();
		}
	}

	render() {
		if (!session.isAdminUser()) {
			return <Redirect to='/login' />;
		}
		return (
		<div>
			<div className='header'>
				<div className='admin-logo'>
							<img className='logo' src='/assets/images/brand-logo.png' alt='Brand Logo' />
				</div>
				<div className='main-menu'>
					<a href='/admin/manage-users' className={this.props.viewType === Common.actionType.verified ? 'active' : ''}>Manage Users</a>
					<a className={this.props.viewType === Common.actionType.request ? 'active' : ''} href={`/admin/manage-users?viewType=${Common.actionType.request}`}>Manage Request</a>
				</div>

				<div className='user-dropdown'>
					<Dropdown>
									<Dropdown.Toggle id='dropdown-basic'>
										{this.props.full_name} <span><img className='logo' src='/assets/images/caret-down.png' alt='Caret icon' /></span>
									</Dropdown.Toggle>
									<Dropdown.Menu>
											<Dropdown.Item href='#' onClick={this.changePassword}>Change Password</Dropdown.Item>
							<Dropdown.Item onClick={this.props.onLogout}>Sign Out</Dropdown.Item>
									</Dropdown.Menu>
									</Dropdown>
				</div>



			</div>
			<ChangePassword ref={this.changePassRef} />
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
