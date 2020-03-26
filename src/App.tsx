import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PageNotFound from './components/common/pageNotFound';
import CultureCalendar from './components/calendar/CultureCalendar';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<div className='body_sec'>
					<section id='Content'>
						<Route path='/culture-graph' exact component={PageNotFound}></Route>
						<Route path='/no-page' exact component={PageNotFound}></Route>
						<Route path='/' exact component={CultureCalendar}></Route>
						<Route path='/culture-calendar' exact component={CultureCalendar}></Route>
					</section>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
