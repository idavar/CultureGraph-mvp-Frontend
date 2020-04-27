import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Culture from '../Culture/Culture';
import { setDataRef } from '../../helpers';
import { User } from '../../interface/User';

interface HomeProp {
	isAuthenticated: boolean;
	history: History;
}

interface HomeState {
	isKnowMore?: boolean;
}

class Home extends React.Component<HomeProp, HomeState> {
	constructor(props: HomeProp) {
		super(props);
		this.state = {
			isKnowMore: false
		};
	}

	toggleKnowMore = (): void => {
		this.setState({isKnowMore: !this.state.isKnowMore});
	}

	searchKeyword = (): void => {
		this.props.history.push('/search');
	}

	render() {
		return (
				<div>
						<Header />
						<div className='main'>
					{/* Banner section start here.. */}
							<div className='banner-section'>
								<div className='container'>
									<div className='col-md-6'>
											<div className='banner-content'>
												<h1>CultureGraph</h1>
												<p>A smart tool that provides real-time cultural insights to help you create more effective and efficient experiences for consumer audiences.</p>
													<form>
												<div className='banner-search'>
												<input type='text' placeholder='Search here for festivals, food, music and more...'></input>
													<button type='button' onClick={this.searchKeyword}><img src='/assets/images/search-icon-white.png' alt='Search Icon' /></button>
												</div>
												</form>
												<div className='safty-note-wrap'>
												<span className='safty-note'> Your search is safe with us. <small className='safty-know-more' onClick={this.toggleKnowMore}>Know more</small></span>
												{
													this.state.isKnowMore ? <div className='safty-note-content'>
													<p>When you search on CultureGraph, you generate information, like keywords or locations.
														This information can help make our tool smarter and work better for you. None of this information
														collected will identify you personally.</p>
												</div> : ''
												}
												</div>
											</div>
									</div>

									</div>
									<div className='banner-image'>
									<img src='/assets/images/banner.png' alt='Banner' />
									</div>
								</div>

								{/* CultureGraph section start here.. */}
								<div id='culture-graph'>
							<div className='culture-graph-section clearfix'>
							<div className='container'>
							<div className='watermark-title-section'>
								<div className='watermark-title'>
									<span>CultureGraph by IVOW</span>
									<h3>CultureGraph by IVOW</h3>
								</div>
								<p>CultureGraph gives brands, advertisers, and researchers a better understanding of culture,
									 and better returns from interactions with customers, based on that understanding.</p>
								</div>

								<div className='row'>
									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culturemap.png' alt='Culture Map' />
											<h4>Culture Map</h4>
											<p>A real-time map of contemporary cultures & subcultures across consumer audiences, identified
												 and graphed by our AI using public data. </p>
										</div>
									</div>

									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culture-calendar.png' alt='Culture calendar' />
											<h4>Culture Calendar</h4>
											<p>Uses Machine Learning in real-time to catalog global celebrations year-round and generate
												 granular cultural and
 geographic context.  </p>
										</div>
									</div>

									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culture-analytics.png' alt='Culture Analytics' />
											<h4>Culture Analytics</h4>
											<p>Provides useful insights & analytics to help enterprises engage audiences and increase conversions and
												satisfaction ratings.</p>
										</div>
									</div>
								</div>

								</div>
							</div>
							</div>

							<div className='explore-section'>
							<div className='container'>
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
							</div>
							</div>

							<div id='culture-map'>
					<Culture isAuthenticated={this.props.isAuthenticated} />
							</div>
				<div id='how-it-works'>
							<div className='how-it-work-section'>

<div className='container'>
<div className='watermark-title-section'>
<div className='watermark-title'>
	<span>How It Works</span>
	<h3>How It Works</h3>
</div>
<p>We take commonly-overlooked data from cultural and subcultural psychographics: food, music, arts, sports, holidays, and festivals.
	Then we use machine learning to identify and segment consumer audiences in real-time, allowing you to refine and direct your message to the most relevant customers.</p>
</div>

<div className='work-graph'>
									<div className='work-graph-row'>
									<div className='img-block text-right'>
									<img src='/assets/images/work1.png' alt='graph1' />
									</div>

									<div className='graph-no'>
										<span> <small>01</small></span>
									</div>


									<div className='content-block text-left'>
										<p>IVOW's CultureGraph helps you <br></br>identify, analyze, and serve key new <br></br>customer segments using public data.</p>
									</div>

							</div>
							<div className='work-graph-row row-even'>


							<div className='content-block text-right'>
										<p>IVOW's CultureGraph provides brands with cultural factors in support of corporate <br></br>decision-making processes.</p>
									</div>

									<div className='graph-no'>
										<span> <small>02</small></span>
									</div>



									<div className='img-block text-left'>
									<img src='/assets/images/work2.png' alt='graph1' />
									</div>

							</div>

							<div className='work-graph-row'>
									<div className='img-block text-right'>
									<img src='/assets/images/work3.png' alt='graph1' />
									</div>

									<div className='graph-no'>
										<span> <small>03</small></span>
									</div>


									<div className='content-block text-left'>
										<p>IVOW's CultureGraph informs<br></br> culturally-directed content strategy development.</p>
									</div>

							</div>
							</div>

</div>

</div>
</div>
					<div id='our-mission'>

							<div className='our-mission-section'>
								<div className='container'>

									<div className='row'>
										<div className='col-md-6'>
										<div className='our-mission-content'>
										<div className='watermark-title-section'>
								<div className='watermark-title'>
									<span>Our <br></br>Mission</span>
									<h3>Our <br></br>Mission</h3>
								</div>

								</div>
								<p>At IVOW AI, our mission is to make data culturally relevant.</p>
								<p>IVOW stands for Intelligent Voices of Wisdom.</p>
								<p>Everybody can get their hands on different types of data. What sets us apart is not the input data, it is what we
									do with it. Our CultureGraph platform represents the foremost advancement in artificial intelligence (AI) as applied to audience research. </p>
										</div>

										</div>

										<div className='col-md-6'>
										<div className='our-mission-img'>
										<img src='/assets/images/mission.png' alt='Mission' />
										</div>

										</div>
									</div>

								</div>
							</div>
							</div>

							<div id='clients'>
							<div className='our-client-section'>

<div className='container'>
<div className='watermark-title-section'>
<div className='watermark-title'>
	<span>Clients</span>
	<h3>Clients</h3>
</div>
</div>

<div className='client-wrap'>
	<div className='client'>
	<img src='/assets/images/client1.png' alt='Client 1' />
	</div>
	<div className='client'>
	<img src='/assets/images/client2.png' alt='Client 2' />
	</div>
	<div className='client'>
	<img src='/assets/images/client3.png' alt='Client 3' />
	</div>
	<div className='client'>
	<img src='/assets/images/client4.png' alt='Client 4' />
	</div>
	<div className='client'>
	<img src='/assets/images/client5.png' alt='Client 5' />
	</div>

</div>
</div>

</div>
</div>


							</div>




						<Footer />
				</div>
				);
	}
}

function mapStateToProps(state: {auth: User}) {
	return setDataRef.setAuthDataObject(state);
}

export default connect(mapStateToProps)(Home);

