import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import logo from './logo.svg';
import './App.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PageNotFound from './components/common/pageNotFound';
import EmailVerify from './components/common/EmailVerify';
import CultureCalendar from './components/calendar/CultureCalendar';
import Auth from './containers/Auth/Auth';
import Signup from './containers/Signup/Signup';
import ManageUsers from './containers/Admin/Users/ManageUsers';
import authReducer from './store/reducers/auth';
import HTML from './containers/html';

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
				<Switch>
					<div className='App'>
						<Header />
						<div className='body_sec'>
							<section id='Content'>
								<Route path='/html' exact component={HTML}></Route>
								<Route path='/login' exact component={Auth}></Route>
								<Route path='/hash_code' exact component={EmailVerify}></Route>
								<Route path='/signup' exact component={Signup}></Route>
								<Route path='/no-page' exact component={PageNotFound}></Route>
								<Route path='/' exact component={CultureCalendar}></Route>
								<Route path='/culture-calendar' exact component={CultureCalendar}></Route>
								<Route path='/admin/login' exact component={Auth}></Route>
								<Route path='/admin/manage-users' exact component={ManageUsers}></Route>
							</section>
						</div>
						<Footer />
					</div>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
