import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import { setDataRef } from '../../helpers';
import * as actions from '../../store/actions/index';

class Header extends React.Component<HeaderProps> {
	render() {
		let headarLink = <div className='menu-log'>
							<a href='/signup'>Become a researcher</a>
							<a href='/login'>LOGIN</a>
						</div>;
		if (this.props.isAuthenticated) {
			headarLink = <div className='menu-log'>
							<Link to='#'>{this.props.full_name}</Link>
							<Link to='#'>Change Password</Link>
							<Link to='#' onClick={this.props.onLogout}>Logout</Link>
						</div>;
		}
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<Link to='#'>Culture Graph</Link>
				<a href='/culture-calendar'>Culture Calendar</a>
				<Link to='#'>How it works</Link>
				<Link to='#'>Our Mission</Link>
				{headarLink}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

