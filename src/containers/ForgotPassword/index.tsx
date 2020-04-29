
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import '../../assets/styles/otp.scss';
import '../../assets/styles/style.scss';
import Input from '../../components/UI/Input/Input';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { FormState } from '../../interface/FormState';
import { ValidationObject } from '../../interface/ValidationObject';
const $ = require( 'jquery' );

interface ForgotProps {
	location: {
		search: string
	};
	history: History;
}
const forgotEmail = 'email';

class ForgotPassword extends React.Component<ForgotProps, FormState> {
		private email_hash_code = '';
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
			this.onOtpKeyUp();
		}

		onOtpKeyUp = () => {
			$('body').on('keyup', '.code', (e: any) => {
				if (e.currentTarget.value.length) {
					$(e.currentTarget).next('.code').focus();
				}
				let otp = '';
				$('.code').each((key: number, eleObj: HTMLInputElement) => {
					otp = `${otp}${eleObj.value}`;
				});
				this.onOtpChange(otp);
			});
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

		onOtpChange = (otp: string) => {
			this.setState({isValidForm: (otp.length === Common.minOtp)});
			this.email_hash_code = otp;
		}

		submitVerifyCode = (event: {preventDefault: Function}) => {
			event.preventDefault();
			this.setState({loading: true});
			const hashCodeData = {
				email: this.state.controls.email.value || this.state.emailId,
				email_hash_code: this.email_hash_code,
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


				return (
					<div className='user-wrapper forgot-password-wrapper'>
				<div className='user-banner'>
        <a href='/'>
            <img className='logo' src='/assets/images/logo.png' alt='Brand Logo' />
        </a>
        <img src='/assets/images/signup-banner.png' alt='Sign Up Banner' />
        <h1>At IVOW AI, our mission is to make data culturally relevant. IVOW stands for Intelligent Voices of Wisdom.
        </h1>
    </div>
					 {
					 (this.state.successMessage || this.state.emailId) ? <div className='user-form'>
						<div className='user-form-inner forgot-password'>
							<span className='close-icon'>
								<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
							</span>
							<img className='email-sent-icon' src='/assets/images/icon-email-sent.png' alt='Email icon' />
							<h2>Enter OTP Code Sent to Your Email</h2>
							<div>
							<div className='code-wrapper'>
								 <input type='text' maxLength={Common.one} className='code' />
								 <input type='text' maxLength={Common.one} className='code' />
								 <input type='text' maxLength={Common.one} className='code' />
								 <input type='text' maxLength={Common.one} className='code' />
								 <input type='text' maxLength={Common.one} className='code' />
							</div>
								<Link className='resend-mail' to='#' onClick={this.submitForm}>Resend Mail</Link>
							</div>

								<div className='form-group'>
									<button disabled={this.state.loading || !this.state.isValidForm} type='submit'
									 className='btn btn-primary btn-block maxwidth-370' onClick={this.submitVerifyCode}>Continue</button>
								</div>
						</div>
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
										<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='mg-top-40 btn btn-primary btn-block'>Submit</button>
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
