
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import '../../assets/styles/style.scss';

import Input from '../../components/UI/Input/Input';
import OurMission from '../../components/common/OurMission';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { FormState } from '../../interface/FormState';
import { ValidationObject } from '../../interface/ValidationObject';
interface ForgotProps {
	location: {
		search: string
	};
	history: History;
}
const forgotEmail = 'email';
const hashCode = 'email_hash_code';
class ForgotPassword extends React.Component<ForgotProps, FormState> {
		constructor(props: ForgotProps) {
			super(props);
			this.state = {
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
						},
						email_hash_code: {
							elementType: 'input',
							elementConfig: {
									type: 'text',
									placeholder: 'Verification Code'
							},
							value: '',
							validation: {
									required: true,
									minLength: Common.minVerifyCodeLength
							},
							valid: false,
							touched: false,
							validationMsg: '',
							messages: ValidationMessage.verification_code
					}
				},
				successMessage: '',
				errorMessage: '',
				isValidForm: false,
				loading: false,
				emailId: ''
			};
		}

		componentDidMount () {
			this.getQueryParams();
		}

		getQueryParams = () => {
			const params = new URLSearchParams(this.props.location.search);
			if (params.get('email')) {
				this.setState({emailId: params.get('email')});
			}
		}

		changedHandler = ( event: any, controlName: string ) => {
				const rulesData = this.state.controls[controlName].validation;
				const value = event.target.value;
				const messages = this.state.controls[controlName].messages;
				const validationData: ValidationObject = validateRef.checkValidite( value, rulesData, messages );
				this.resetFormControls(validationData, controlName, value);
				if (controlName !== forgotEmail) {
					this.checkVerifyForm();
				} else {
					this.checkForgotPasswordForm();
				}
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
					email: this.state.controls.email.value || this.state.emailId,
				};
				apiReq.forgotPassword(userEmail).then(response => {
					this.setState({loading: false});
					if (response.status === Common.status.processed) {
						if (this.state.successMessage || this.state.emailId) {
							ToastSuccess({msg: response.data.detail});
						} else {
							this.setState({isValidForm: false});
							this.setState({successMessage: response.data.detail});
							this.props.history.push(`/forgot-password?email=${userEmail.email}`);
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

		submitVerifyCode = (event: {preventDefault: Function}) => {
			event.preventDefault();
			this.setState({loading: true});
			const hashCodeData = {
				email: this.state.controls.email.value || this.state.emailId,
				email_hash_code: this.state.controls.email_hash_code.value,
			};
			apiReq.verifyCode(hashCodeData).then(response => {
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					const result = response.data;
					ToastSuccess({msg: result.detail});
					this.props.history.push(`/reset-password?token=${result.data.email_hash_code}`);
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
				this.setState({isValidForm: this.state.controls[forgotEmail].valid});
			}, Common.zero);
		}

		checkVerifyForm(): void {
			setTimeout(() => {
				this.setState({isValidForm: this.state.controls[hashCode].valid});
			}, Common.zero);
		}

		render() {
				const forgotConfig = this.state.controls[forgotEmail];
				const forgotForm = <Input
								key={forgotEmail}
								elementType={forgotConfig.elementType}
								elementConfig={forgotConfig.elementConfig}
								value={forgotConfig.value}
								invalid={!forgotConfig.valid}
								shouldValidate={forgotConfig.validation}
								touched={forgotConfig.touched}
								validationMsg={forgotConfig.validationMsg}
								changed={( event: any ) => this.changedHandler( event, forgotEmail )} />;

				const verifyConfig = this.state.controls[hashCode];
				const verifyForm = <Input
								key={hashCode}
								elementType={verifyConfig.elementType}
								elementConfig={verifyConfig.elementConfig}
								value={verifyConfig.value}
								invalid={!verifyConfig.valid}
								shouldValidate={verifyConfig.validation}
								touched={verifyConfig.touched}
								validationMsg={verifyConfig.validationMsg}
								changed={( event: any ) => this.changedHandler( event, hashCode )} />;

				return (
					<div className='user-wrapper'>
					<OurMission />
					 {
					 (this.state.successMessage || this.state.emailId) ? <div className='user-form'>
						<div className='user-form-inner'>
							<span className='close-icon'>
								<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
							</span>
							<h2>Email sent successfully!</h2>
							<h3>Don't worry, we will get you back in to your account shortly. Follow
								the instructions we sent to your email.
							</h3>
							<form onSubmit={this.submitVerifyCode}>
								{verifyForm}
								<div className='form-group'>
									<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Verify Code</button>
								</div>
							</form>
						</div>
						<span className='account-status'><Link to='#' onClick={this.submitForm}>Resend Mail</Link></span>
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
									{forgotForm}
									<div className='form-group'>
										<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Submit</button>
									</div>
								<a href='/login' className='backto-signin'>Back to Sign in</a>
								</form>
						</div>
							
					</div>}

					</div>
				);
		}
}

export default connect()( ForgotPassword );
