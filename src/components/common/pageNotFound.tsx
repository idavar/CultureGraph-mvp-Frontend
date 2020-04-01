import React from 'react';

import Header from './Header';
import Footer from './Footer';

class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div className='page-not-found'>
					Under construction.
				</div>
				<Footer />
			</div>
			);
	}
}

export default PageNotFound;
