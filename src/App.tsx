import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import PageNotFound from './components/common/pageNotFound';
import EmailVerify from './components/common/EmailVerify';
import Auth from './containers/Auth/Auth';
import Signup from './containers/Signup/Signup';
import ManageUsers from './containers/Admin/Users/ManageUsers';
import Home from './containers/Home/Home';
import * as actions from './store/actions/index';
import { User } from './interface/User';
import Common from './constant/common';

import HTML from './containers/html';

interface Props {
	onTryAutoSignup: Function;
	isAuthenticated: boolean;
	isAdmin: boolean;
}

class App extends Component<Props> {
	componentDidMount () {
		this.props.onTryAutoSignup();
	}

	render () {
		let publicRoute = null;
		let privateRoute = null;
		let adminRoute = null;
		if ( !this.props.isAuthenticated ) {
			publicRoute = (
				<Switch>
					<Route path='/admin/manage-users' exact component={ManageUsers}></Route>
					<Route path='/html' exact component={HTML}></Route>
					<Route path='/no-page' exact component={PageNotFound}></Route>
					<Route path='/login' exact component={Auth}></Route>
					<Route path='/signup' exact component={Signup}></Route>
					<Route path='/' exact component={Home}></Route>
					<Redirect from='*' to='/signup' />
				</Switch>
			);
		} else  {
			if (this.props.isAdmin) {
				adminRoute = (
					<Switch>
						<Route path='/admin/manage-users' exact component={ManageUsers}></Route>
						<Redirect from='*' to='/admin/manage-users' />
					</Switch>
				);
			} else {
				privateRoute = (
					<Switch>
						<Route path='/html' exact component={HTML}></Route>
						<Route path='/no-page' exact component={PageNotFound}></Route>
						<Route path='/' exact component={Home}></Route>
						<Redirect from='*' to='/' />
					</Switch>
				);
			}
		}
		const routes = (
			<Switch>
				<Route path='/hash_code' exact component={EmailVerify}></Route>
				{privateRoute}
				{publicRoute}
				{adminRoute}
			</Switch>
		);

		return (
				<div className='App'>
					{routes}
				</div>
		);
	}
}


const mapStateToProps = (state: {auth: User}) => {
	return {
		isAuthenticated: !!state.auth.token,
		isAdmin: state.auth.group === Common.group.admin
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
			onTryAutoSignup: () => dispatch( actions.authCheckState() )
	};
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
