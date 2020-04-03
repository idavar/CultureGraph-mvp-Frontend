import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../interface/User';
import Common from '../../constant/common';
import * as actions from '../../store/actions/index';

interface Props {
	isAuthenticated: boolean;
	isAdmin: boolean;
	full_name: string | undefined;
	onLogout: () => void;
}

class Header extends React.Component<Props> {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

