import React from 'react';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

class Home extends React.Component {
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
												<input type='text' placeholder='Search here for culture, activities, events and more…'></input>
													<button type='button'><img src='/assets/images/search-icon-white.png' alt='Search Icon' /></button>
												</div>
												</form>
												<span className='safty-note'> Your search is safe with us. <a href='#'>Know more</a></span>
											</div>
									</div>

									</div>
									<div className='banner-image'>
									<img src='/assets/images/banner.png' alt='Banner' />
									</div>
								</div>

								{/* CultureGraph section start here.. */}
							<div className='culture-graph-section clearfix'>
							<div className='container'>
							<div className='watermark-title-section'>
								<div className='watermark-title'>
									<span>CultureGraph by IVOW</span>
									<h3>CultureGraph by IVOW</h3>
								</div>
								<p>CultureGraph gives brands, advertisers, and researchers a better understanding of culture, and better returns from interactions with customers, based on that understanding.</p>
								</div>

								<div className='row'>
									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culturemap.png' alt='Culture Map' />
											<h4>Culture Map</h4>
											<p>A real-time map of contemporary cultures & subcultures across consumer audiences, identified and graphed by our AI using public data. </p>
										</div>
									</div>

									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culture-calendar.png' alt='Culture calendar' />
											<h4>Culture Calendar</h4>
											<p>Uses Machine Learning in real-time to catalog global celebrations year-round and generate granular cultural and
 geographic context.  </p>
										</div>
									</div>

									<div className='col-md-4'>
										<div className='culture-block'>
										<img src='/assets/images/culture-analytics.png' alt='Culture Analytics' />
											<h4>Culture Analytics</h4>
											<p>Provides useful insights & analytics to help enterprises engage audiences and increase conversions and satisfaction ratings.</p>
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
												<a href='#' className='holi' >Holi Festival <small>20M</small></a>
												<a href='#'  className='herring'>Herring Festival <small>18M</small></a>
												<a href='#' className='hogmanay'>Hogmanay <small>10M</small></a>
												<a href='#'  className='donauinselfest'>Donauinselfest<small>9.1M</small></a>
												<a href='#'  className='carnevale'>Carnevale <small>5M</small></a>
												<a href='#'  className='primavera'>Primavera sound <small>4.1k</small></a>
												<a href='#'  className='let-it-roll'>Let It Roll <small>90k</small></a>
												<a href='#'  className='soccer'>Soccer <small>7.7M</small></a>
												<a href='#'  className='becon'>Becon Festival <small>12M</small></a>
												<a href='#'  className='tabletennis'>Table Tennis<small>70k</small></a>
												</div>
										</div>
									</div>
							</div>
							</div>


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
								<p>Everybody can get their hands on different types of data. What sets us apart is not the input data, it is what we do with it. Our CultureGraph platform represents the foremost advancement in artificial intelligence (AI) as applied to audience research. </p>
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
				
					


						<Footer />
				</div>
				);
	}
}

export default Home;
