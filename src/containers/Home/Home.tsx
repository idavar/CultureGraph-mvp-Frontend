import React from 'react';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

class Home extends React.Component {
	render() {
		return (
				<div>
						{/* <Header /> */}
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
							<div className='culture-graph-section'>
								<div className='watermark-heading'>
									<span>CultureGraph by IVOW</span>
									<h3>CultureGraph by IVOW</h3>
								</div>
							</div>

							</div>
				
					


						{/* <Footer /> */}
				</div>
				);
	}
}

export default Home;
