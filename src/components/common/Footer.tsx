import React from 'react';

class Footer extends React.Component {
	render() {
		return (<footer>

			<div className='social-links'>
			<a href='/'><img  src='/assets/images/icon-fb.png' alt='Facebook Icon' /></a>
			<a href='/'><img  src='/assets/images/icon-twitter.png' alt='Twitter Icon' /></a>
			<a href='/'><img  src='/assets/images/icon-linkedin.png' alt='Linkedin Icon' /></a>
			</div>
			<p>Read Our <a href='/'>Privacy Policy </a></p>

			</footer>);
	}
}

export default Footer;
