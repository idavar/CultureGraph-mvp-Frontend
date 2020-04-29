import React from 'react';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

class KeywordSearch extends React.Component {
	render() {
		return (<div className='search-event-page'>
            <Header />
            <div className='container'>
                <div className='search-event-body'>
                        <div className='searchbox'>
                            <input type='text'></input>
                        <button type='button'><img src='/assets/images/search-icon-white.png' alt='Search Icon' /></button>   

                        <span className='result-found'>9 Result Found For <em>"Holi"</em></span>
                        </div>
                        <div className='result-box'>
                            <h4>Our AI brings you the most suitable keywords for your search. Click on any keyword to see more details.</h4>
                            <div className='tags'>
                                <a href='/' className='color_1'> <span>Holi Festival </span> <em></em></a>
                                <a href='/' className='color_2'>Holi Colour <em></em></a>
                                <a href='/' className='color_3'>Holi Utsav <em></em></a>
                                <a href='/' className='color_4'>Holi Drawing <em></em></a>
                                <a href='/' className='color_5'>Holi Story<em></em></a>
                                <a href='/' className='color_6'>Playing Holi <em></em></a>
                                <a href='/' className='color_7'>Happy Holi<em></em></a>
                                <a href='/' className='color_8'>Holi food<em></em></a>
                                <a href='/' className='color_9'>Holi Drawing<em></em></a>
                                <a href='/' className='color_10'>Holi Story<em></em></a>
                            </div>
                        </div>
                </div>
            </div>
           
        </div>);
	}
}

export default KeywordSearch;
