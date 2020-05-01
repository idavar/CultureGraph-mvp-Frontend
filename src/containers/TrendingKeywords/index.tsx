import React from 'react';
import { Link } from 'react-router-dom';
import { Keyword } from './../../interface/Keyword';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';
import millify from 'millify';

interface KeywordProp {
	isAuthenticated: boolean;
}
interface KeywordState {
    partOneKeyword: Array<Keyword>;
    partTwoKeyword: Array<Keyword>;
}
class TrendingKeywords extends React.Component<KeywordProp, KeywordState> {
	constructor(props: KeywordProp) {
		super(props);
		this.state = {
            partOneKeyword: [],
            partTwoKeyword: []
        };
    }

    componentDidMount () {
        this.getTrendingKeywords();
    }

    getTrendingKeywords = () => {
        apiReq.getTrendingKeyword().then(rst => {
            const rstData = rst.data;
            this.setState({ partOneKeyword: rstData.data.slice(Common.zero, Common.one) });
            this.setState({ partTwoKeyword: rstData.data.slice(Common.one, rstData.data.length) });
		}).catch(err => {});
    }

    millifyNumber = (frequency: number) => {
        return millify(frequency);
    }

	render() {
		return (<div className='container'>
        <div className='watermark-title-section'>
        <div className='watermark-title'>
            <span>Explore</span>
            <h3>Explore</h3>
        </div>
        <h4>Top 10 Trending Cultural Keywords</h4>
        <p>Highest trending keywords and mentions globally for culture, arts, food,<br></br> sports, music, and traditional festivals.</p>
        </div>
            <div className='row'>
                <div className='col-md-6'>
                        <div className='explore-graph'>
                        <img src='/assets/images/piechart.png' alt='Piechart' />
                        </div>
                </div>
                <div className='col-md-6'>
                        <div className='explore-detail'>
                        <div className='explore-event'>
                        {
                            this.state.partOneKeyword.map((key: Keyword, i) => (
                            <Link to={`/search?search=${key.name}`} key={key.search_frequency} className={Common.keywordClassOne[i]} >
                                {key.name}<small>
                                {key.search_frequency}</small></Link>
                            ))
                        }
                        {
                        this.props.isAuthenticated ?
                        <React.Fragment>
                        {
                            this.state.partTwoKeyword.map((key: Keyword, j) => (
                            <Link to={`/search?search=${key.name}`} key={key.search_frequency}
                            className={Common.keywordClassTwo[j]} >
                                {key.name}<small>
                                {this.millifyNumber(key.search_frequency)}</small></Link>
                            ))
                        }
                        </React.Fragment> : ''
                        }
                        </div>
                        {!this.props.isAuthenticated ? <div className='explore-note'>
                            <h4>Become a reseacher to view all trending keywords.</h4>
                            <p>Register yourself as researcher to get complete access to culture calendar.</p>
                            <a href='/signup' className='explore-register'>Register Now</a>
                        </div> : ''}
                        </div>
                </div>
            </div>
        </div>);
	}
}

export default TrendingKeywords;
