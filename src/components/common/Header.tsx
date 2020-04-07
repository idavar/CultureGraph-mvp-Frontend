import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
	} from 'reactstrap';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import { setDataRef } from '../../helpers';
import * as actions from '../../store/actions/index';
interface HeaderState {
	isOpen: boolean | undefined;
}
class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle = (): void => {
		this.setState({isOpen: !this.state.isOpen});
	}

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
			  <Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>Culture Graph</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
				  <Nav className='mr-auto' navbar>
					<NavItem>
					  <NavLink href='/culture-calendar'>Culture Calendar</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink href='/'>How it works</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar>
					  <DropdownToggle nav caret>
						About IVOW
					  </DropdownToggle>
					  <DropdownMenu right>
						<DropdownItem>
							Our Mission
						</DropdownItem>
					  </DropdownMenu>
					</UncontrolledDropdown>
				  </Nav>
				<NavbarText>{headarLink}</NavbarText>
				</Collapse>
			  </Navbar>
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

