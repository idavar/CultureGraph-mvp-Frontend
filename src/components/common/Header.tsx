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
			<div className='web-header'>
				<div className='container'>
				<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>	<img className='logo' src='/assets/images/brand-logo.png' alt='Brand Logo' /></NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
				  <Nav className='mr-auto' navbar>
					<NavItem>
					  <NavLink href='#'>Trending Keywords</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink href='#'>Culture Map</NavLink>
					</NavItem>

					<NavItem>
					  <NavLink href='#'>Culture Calendar</NavLink>
					</NavItem>
		
					<UncontrolledDropdown nav inNavbar>
					  <DropdownToggle nav className='caret'>
						About IVOW
					  </DropdownToggle>
					  <DropdownMenu right>
						<a href='/'>
						Culture-IQ by IVOW
						</a>
					
						<a href='/'>
						How it Works
						</a>
						<a href='/'>
						Our Mission
						</a>
			
					  </DropdownMenu>
					</UncontrolledDropdown>
				  </Nav>

					<Nav className='navbar-right' navbar>
					<UncontrolledDropdown nav inNavbar>
					{ this.props.isAuthenticated ?
						<div><DropdownToggle nav className='caret'>
					  {this.props.full_name}
					  </DropdownToggle>
					  <DropdownMenu right>
						<Link to='#'>
							Change Password
						</Link>
						<Link to='#' onClick={this.props.onLogout}>
							Sign Out
						</Link>
					  </DropdownMenu>
						</div> :
						<div className='header-signup-section'>
							<a href='/signup'>Become a researcher</a>
							<a href='/login' className='signin-btn'>Sign In</a>
						</div>
						}
					</UncontrolledDropdown>
				  </Nav>
				</Collapse>
			  </Navbar>
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

