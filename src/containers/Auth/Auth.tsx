import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import '../../assets/styles/style.scss';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import Common from '../../constant/common';
import { User } from '../../interface/User';
import { Error } from '../../interface/Error';

interface AuthState {
		controls: any;
		isValidForm: boolean;
}

interface Props {
		isAuthenticated: boolean;
		authRedirectPath?: string;
		isAdmin: boolean;
		error: Error | null | undefined;
		loading: boolean | undefined;
		onAuth: (email: string, password: string) => void;
}

class Auth extends React.Component<Props, AuthState> {
		constructor(props: Props) {
				super(props);
				this.state = {
						controls: {
								email: {
										elementType: 'input',
										elementConfig: {
												type: 'email',
												placeholder: 'Email'
										},
										value: '',
										validation: {
												required: true,
												isEmail: true
										},
										valid: false,
										touched: false,
										validationMsg: '',
										messages: ValidationMessage.email
								},
								password: {
										elementType: 'input',
										elementConfig: {
												type: 'password',
												placeholder: 'Password'
										},
										value: '',
										validation: {
												required: true,
												minLength: 6
										},
										valid: false,
										touched: false,
										validationMsg: '',
										messages: ValidationMessage.password
								}
						},
						isValidForm: false
				};
		}

		inputChangedHandler = ( event: any, controlName: string ) => {
				const validationData: {isValid: boolean, validationMsg?: string}	= validateRef.checkValidite( event.target.value, this.state.controls[controlName].validation,
					this.state.controls[controlName].messages );
				const updatedControls = {
						...this.state.controls,
						[controlName]: {
								...this.state.controls[controlName],
								value: event.target.value,
								valid: validationData.isValid,
								touched: true,
								validationMsg: validationData.validationMsg
						}
				};
				this.setState( { controls: updatedControls } );
				setTimeout(() => {
					this.checkFormValid();
				}, Common.zero);
		}

		submitHandler = (event: any) => {
				event.preventDefault();
				this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
		}

		checkFormValid(): void {
			this.setState({isValidForm: true});
			for (const key in this.state.controls) {
				if (this.state.controls[key]) {
					if (!this.state.controls[key].valid) {
						this.setState({isValidForm: this.state.controls[key].valid});
					}
				}
			}
		}

		render() {
				const formElementsArray = [];
				for (const key in this.state.controls) {
						if (this.state.controls[key]) {
							formElementsArray.push( {
									id: key,
									config: this.state.controls[key]
							});
						}
				}

				const form = formElementsArray.map( formElement => (
						<Input
								key={formElement.id}
								elementType={formElement.config.elementType}
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched={formElement.config.touched}
								validationMsg={formElement.config.validationMsg}
								changed={( event: any ) => this.inputChangedHandler( event, formElement.id )} />
				) );

				let authRedirect = null;
				if (this.props.isAuthenticated && this.props.authRedirectPath) {
					authRedirect = <Redirect to={this.props.authRedirectPath}/>;
				}
				return (
					<div className='user-wrapper'>
						{authRedirect}
						<div className='user-banner'>
							<a href='/'>
								<img className='logo' src='/assets/images/logo.png' alt='Brand Logo' />
							</a>
							<img src='/assets/images/signup-banner.png' alt='Sign Up Banner' />
							<h1>At IVOW AI, our mission is to make data culturally relevant. IVOW stands for Intelligent Voices of Wisdom.
							</h1>
						</div>
						<div className='user-form'>
							<div className='user-form-inner'>
							{/*  page close icon start here */}
							<span className='close-icon'>
								<a href='/signup'><img src='/assets/images/close.png' alt='Close Icon' /></a>
							</span>
							{/*  page close icon end here */}
							<h2>Sign In</h2>
							<h3>Welcome back! Please login to your account.</h3>
							<form onSubmit={this.submitHandler}>
								{form}
								{/*  Forgot Password Start here --> */}
								<div className='form-group'>
									<Link to='#' className='forgot-password-link'>Forgot Password?</Link>
								</div>
								{/* Forgot Password end here */}

								<div className='form-group'>
									<button disabled={this.props.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Sign In</button>
								</div>
							</form>
							</div>
							<span className='account-status'>Don’t have an account yet? <a href='/signup'>Sign up</a></span>
						</div>
					</div>
				);
		}
}

const mapStateToProps = (state: {auth: User}) => {
		return {
				loading: state.auth.loading,
				error: state.auth.error,
				isAuthenticated: !!state.auth.token,
				isAdmin: state.auth.group === Common.group.admin,
						authRedirectPath: state.auth.authRedirectPath
		};
};

const mapDispatchToProps = (dispatch: Function) => {
		return {
				onAuth: (email: string, password: string) =>  dispatch(actions.auth( email, password ))
		};
};

export default connect(mapStateToProps, mapDispatchToProps)( Auth );
