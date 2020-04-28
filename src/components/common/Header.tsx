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
	} from 'reactstrap';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ChangePassword from '../../containers/ChangePassword/ChangePassword';
import { User } from '../../interface/User';
import { HeaderProps } from '../../interface/HeaderProps';
import { apiReq, setDataRef } from '../../helpers';
import * as actions from '../../store/actions/index';
import Common from '../../constant/common';
interface HeaderState {
	isOpen?: boolean;
}
class Header extends React.Component<HeaderProps, HeaderState> {
	updatePassRef = React.createRef<ChangePassword>();
	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	/**
	 * @description get user  data for check user profile is valid or not
	 */
	getProfile = () => {
		apiReq.getProfile().then();
	}

	/**
	 * @description function used for open change password popup for user
	 */
	onChangePassword = () => {
		if (this.updatePassRef.current) {
			this.updatePassRef.current.changePassword();
		}
	}

	toggle = (): void => {
		this.setState({isOpen: !this.state.isOpen});
		this.addRemoveNavbarClass();
	}

	addRemoveNavbarClass = (): void => {
		const classValue = 'navbar-toggler-icon1';
		const navbarTogglerEle = document.getElementsByClassName('navbar-toggler-icon');
		if (!this.state.isOpen) {
			navbarTogglerEle[Common.zero].classList.add(classValue);
		} else {
			navbarTogglerEle[Common.zero].classList.remove(classValue);
		}
	}

	render() {
		if (this.props.isAuthenticated) {
			this.getProfile();
		}
		return (
			<div className='web-header'>
				<div className='container'>
				<Navbar color='light' light expand='lg'>
				<NavbarBrand href='/'>	<img className='logo' src='/assets/images/brand-logo.png' alt='Brand Logo' /></NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
				  <Nav className='mr-auto' navbar>
					<NavItem>
					  <NavLink href='#' onClick={this.toggle}>Trending Keywords</NavLink>
					</NavItem>
					<NavItem>
					  <NavLink href='#' onClick={this.toggle}>Culture Map</NavLink>
					</NavItem>

					<NavItem>
					  <NavLink href='#culture-map' onClick={this.toggle}>Culture Calendar</NavLink>
					</NavItem>

					<UncontrolledDropdown nav inNavbar >
					  <DropdownToggle nav className=' m-dropdown caret'>
						About IVOW
					  </DropdownToggle>
					  <DropdownMenu right>
						<a href='#culture-graph' onClick={this.toggle}>
						CultureGraph by IVOW
						</a>

						<a href='#how-it-works' onClick={this.toggle}>
						How It Works
						</a>
						<a href='#our-mission' onClick={this.toggle}>
						Our Mission
						</a>
						<a href='#clients' onClick={this.toggle}>
						Clients
						</a>
					  </DropdownMenu>
					</UncontrolledDropdown>
				  </Nav>

					<Nav className='navbar-right' navbar>
					<UncontrolledDropdown nav inNavbar>
					{ this.props.isAuthenticated ?
						<div><DropdownToggle nav className=' m-dropdown caret'>
					  {this.props.full_name}
					  </DropdownToggle>
					  <DropdownMenu right>
						<Link to='#' onClick={this.onChangePassword}>
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
				<ChangePassword ref={this.updatePassRef} />
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

