
import React from 'react';
import { connect } from 'react-redux';

import '../../assets/styles/style.scss';

import Input from '../../components/UI/Input/Input';
import OurMission from '../../components/common/OurMission';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { FormState } from '../../interface/FormState';
import { Link } from 'react-router-dom';

interface ValidationObject {
	isValid: boolean;
	validationMsg?: string;
}

class ForgotPassword extends React.Component {
		state: FormState = {
				controls: {
						email: {
								elementType: 'input',
								elementConfig: {
										type: 'email',
										placeholder: 'Email Id'
								},
								value: '',
								validation: {
										required: true,
										isEmail: true,
										maxLength: Common.emailLength
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.email
						}
				},
				successMessage: '',
				errorMessage: '',
				isValidForm: false,
				loading: false
		};

		changedHandler = ( event: any, controlName: string ) => {
				const rulesData = this.state.controls[controlName].validation;
				const value = event.target.value;
				const messages = this.state.controls[controlName].messages;
				const validationData: ValidationObject = validateRef.checkValidite( value, rulesData, messages );
				this.resetFormControls(validationData, controlName, value);
				this.checkForgotPasswordForm();
		}

		resetFormControls = (validationData: ValidationObject, controlName: string, value: string) => {
			const updatedControls = {
				...this.state.controls,
				[controlName]: {
						...this.state.controls[controlName],
						valid: validationData.isValid,
						touched: true,
						validationMsg: validationData.validationMsg,
						value
				}
			};
			this.setState( { controls: updatedControls } );
		}

		submitForm = ( event: {preventDefault: Function}) => {
				event.preventDefault();
				this.setState({loading: true});
				const userEmail = {
					email: this.state.controls.email.value,
				};
				apiReq.forgotPassword(userEmail).then(response => {
					this.setState({loading: false});
					if (response.status === Common.status.processed) {
						if (this.state.successMessage) {
							ToastSuccess({msg: this.state.successMessage});
						} else {
							this.setState({successMessage: response.data.detail});
						}
					} else {
						validateRef.displayErrorMessage(response);
					}
				}).catch(err => {
					try {
						this.setState({loading: false});
						validateRef.displayErrorMessage(err.response);
					} catch (err) {}
				});
		}

		checkForgotPasswordForm(): void {
			setTimeout(() => {
				this.setState({isValidForm: true});
				for (const key in this.state.controls) {
					if (this.state.controls[key] && !this.state.controls[key].valid) {
							this.setState({isValidForm: this.state.controls[key].valid});
					}
				}
			}, Common.zero);
		}

		render() {
				const formElementsArray = [];
				for ( const key in this.state.controls ) {
					if (this.state.controls[key]) {
						formElementsArray.push( {
							id: key,
							config: this.state.controls[key]
						} );
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
								changed={( event: any ) => this.changedHandler( event, formElement.id )} />
				) );

				return (
					<div className='user-wrapper'>
					<OurMission />
					 {
					 this.state.successMessage ? <div className='user-form'>
						<div className='user-form-inner'>
							<span className='close-icon'>
								<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
							</span>
							<h2>Email sent successfully!</h2>
							<h3>Don't worry, we will get you back in to your account shortly. Follow
								the instructions we sent to your email.
							</h3>
							<div className='form-group'>
							<button className='btn btn-primary' onClick={this.submitForm}>Resend Mail</button>
							</div>
						</div>
						<span className='account-status'><Link to='/login'>Back to Sign in</Link></span>
					</div> : <div className='user-form'>
						<div className='user-form-inner'>
						{/*  page close icon start here */}
						<span className='close-icon'>
							<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
						</span>
						{/*  page close icon end here */}
						<h2>Forgot Password</h2>
						<h3>Enter your email address to reset your password.</h3>
								<form onSubmit={this.submitForm}>
										{form}
										<div className='form-group'>
											<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Submit</button>
										</div>
								</form>
						</div>
								<span className='account-status'><a href='/login'>Back to Sign in</a></span>
					</div>}

					</div>
				);
		}
}

export default connect()( ForgotPassword );
