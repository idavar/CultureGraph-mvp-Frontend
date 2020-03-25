import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CultureCalendar from './components/calendar/CultureCalendar';

function App() {
	return (
		<div className='App'>
			<Header />
			<div className='body_sec'>
				<section id='Content'>
					<CultureCalendar />
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default App;
