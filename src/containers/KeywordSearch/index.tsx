import React from 'react';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

class KeywordSearch extends React.Component {
	render() {
		return (<div>
            <Header />
            <div className='page-not-found'>
                Search
            </div>
            <Footer />
        </div>);
	}
}

export default KeywordSearch;
