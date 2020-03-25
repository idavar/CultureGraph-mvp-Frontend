import React from 'react';

class Header extends React.Component {
	render() {
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<a href='javascript:void(0);'>Culture Graph</a>
				<a href='javascript:void(0);'>Culture Calendar</a>
				<a href='javascript:void(0);'>How it works</a>
				<a href='javascript:void(0);'>Our Mission</a>
				<div className='menu-log'>
					<a href='javascript:void(0);'>SIGNUP</a>
					<a href='javascript:void(0);'>LOGIN</a>
				</div>
			</div>
		</div>
		);
	}
}

export default Header;
