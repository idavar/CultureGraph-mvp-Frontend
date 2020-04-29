import React from 'react';
import { Link } from 'react-router-dom';
interface KeywordProp {
	isAuthenticated: boolean;
}
class TrendingKeywords extends React.Component<KeywordProp> {
	constructor(props: KeywordProp) {
		super(props);
		this.state = {
		};
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
                        <Link to='#' className='holi' >Holi Festival <small>20M</small></Link>
                        {
                        this.props.isAuthenticated ?
                        <React.Fragment>
                        <Link to='#' className='herring'>Herring Festival <small>18M</small></Link>
                        <Link to='#' className='hogmanay'>Hogmanay <small>10M</small></Link>
                        <Link to='#' className='donauinselfest'>Donauinselfest<small>9.1M</small></Link>
                        <Link to='#' className='carnevale'>Carnevale <small>5M</small></Link>
                        <Link to='#' className='primavera'>Primavera sound <small>4.1k</small></Link>
                        <Link to='#' className='let-it-roll'>Let It Roll <small>90k</small></Link>
                        <Link to='#' className='soccer'>Soccer <small>7.7M</small></Link>
                        <Link to='#' className='becon'>Becon Festival <small>12M</small></Link>
                        <Link to='#' className='tabletennis'>Table Tennis<small>70k</small></Link>
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
