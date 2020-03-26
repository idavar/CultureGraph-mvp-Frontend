import React from 'react';

class Header extends React.Component {
	render() {
		return (
		<div>
			<header>&nbsp;</header>
			<div className='menu'>
				<a href='/culture-graph'>Culture Graph</a>
				<a href='/culture-calendar'>Culture Calendar</a>
				<a href='/no-page'>How it works</a>
				<a href='/no-page'>Our Mission</a>
				<div className='menu-log'>
					<a href='/no-page'>SIGNUP</a>
					<a href='/no-page'>LOGIN</a>
				</div>
			</div>
		</div>
		);
	}
}

export default Header;
