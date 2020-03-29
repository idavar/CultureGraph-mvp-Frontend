import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import logo from './logo.svg';
import './App.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PageNotFound from './components/common/pageNotFound';
import CultureCalendar from './components/calendar/CultureCalendar';
import Auth from './containers/Auth/Auth';
import Signup from './containers/Signup/Signup';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: authReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='App'>
					<Header />
					<div className='body_sec'>
						<section id='Content'>
							<Route path='/login' exact component={Auth}></Route>
							<Route path='/signup' exact component={Signup}></Route>
							<Route path='/no-page' exact component={PageNotFound}></Route>
							<Route path='/' exact component={CultureCalendar}></Route>
							<Route path='/culture-calendar' exact component={CultureCalendar}></Route>
						</section>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
