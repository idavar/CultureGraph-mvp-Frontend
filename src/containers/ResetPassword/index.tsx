
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../assets/styles/style.scss';

import Input from '../../components/UI/Input/Input';
import OurMission from '../../components/common/OurMission';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { FormState } from '../../interface/FormState';
import { ValidationObject } from '../../interface/ValidationObject';

const confirmPassword = 'confirm_password';
interface ResetProps {
	location: {
		search: string
	};
}

class ResetPassword extends React.Component<ResetProps, FormState> {
	constructor(props: ResetProps) {
		super(props);
		this.state = {
				controls: {
                    password: {
                        elementType: 'input',
                        elementConfig: {
                                type: 'password',
                                placeholder: 'New Password'
                        },
                        value: '',
                        validation: {
                                required: true,
                                minLength: Common.minPassword,
                                maxLength: Common.maxPassword,
                                isPassword: true
                        },
                        valid: false,
                        touched: false,
                        validationMsg: '',
                        messages: ValidationMessage.password
                },
                confirm_password: {
                        elementType: 'input',
                        elementConfig: {
                                type: 'password',
                                placeholder: 'Confirm New Password'
                        },
                        value: '',
                        validation: {
                                required: true,
                                minLength: Common.minPassword,
                                maxLength: Common.maxPassword,
                                isConfirmPassword: true
                        },
                        valid: false,
                        touched: false,
                        validationMsg: '',
                        messages: ValidationMessage.confirm_password
                }
				},
				successMessage: '',
				errorMessage: '',
				isValidForm: false,
				loading: false,
				token: ''
			};
		}

		componentDidMount () {
			this.getParams();
		}

		getParams = () => {
			const params = new URLSearchParams(this.props.location.search);
			if (params.get('token')) {
				this.setState({token: params.get('token')});
			}
		}

		resetChangedHandler = ( event: any, controlName: string ) => {
			const rulesData = this.state.controls[controlName].validation;
			const value = event.target.value;
			const messages = this.state.controls[controlName].messages;
			const validationData: ValidationObject = validateRef.checkValidite( value, rulesData, messages );
			this.resetFormControls(validationData, controlName, value);
			if (validationData.isValid && (rulesData.isPassword || rulesData.isConfirmPassword)) {
				setTimeout(() => {
					validateRef.matchConfirmPassword(validationData, rulesData, this.state.controls);
					this.resetFormControls(validationData, confirmPassword, this.state.controls[confirmPassword].value);
				}, Common.zero);
			}
			this.checkFormValid();
		}

		checkFormValid(): void {
			setTimeout(() => {
				this.setState({isValidForm: true});
				for (const key in this.state.controls) {
					if (this.state.controls[key] && !this.state.controls[key].valid) {
							this.setState({isValidForm: this.state.controls[key].valid});
					}
				}
			}, Common.zero);
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

		submitResetPassword = ( event: {preventDefault: Function}) => {
				event.preventDefault();
				this.setState({loading: true});
				const resetData = {
					email_hash_code: this.state.token,
					password: this.state.controls.password.value,
				};
				apiReq.resetPassword(resetData).then(response => {
					this.setState({loading: false});
					if (response.status === Common.status.processed) {
						this.setState({successMessage: response.data.detail});
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
								changed={( event: any ) => this.resetChangedHandler( event, formElement.id )} />
				) );

				return (
					<div className='user-wrapper reset-password-wrapper'>
					<div className='user-banner'>
        <a href='/'>
            <img className='logo' src='/assets/images/logo.png' alt='Brand Logo' />
        </a>
        <img src='/assets/images/signup-banner.png' alt='Sign Up Banner' />
        <h1>At IVOW AI, our mission is to make data culturally relevant. IVOW stands for Intelligent Voices of Wisdom.
        </h1>
    </div>
					{
						this.state.successMessage ? <div className='user-form'>
						<div className='user-form-inner password-change-success'>
							<span className='close-icon'>
								<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
							</span>
							<img className='icon-success' src='/assets/images/icon-success.png' alt='Close Check' />
							<h2>Password changed successfully!</h2>
							<h3>Congratulations, your password has been updated. Please sign in with
								your new password.
							</h3>
							<Link to='/login' className='backfrom-password btn btn-primary btn-block maxwidth-370'>Back to Sign in</Link>
						</div>

					</div> : <div className='user-form'>
                            <div className='user-form-inner'>
                            {/*  page close icon start here */}
                            <span className='close-icon'>
                                <a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
                            </span>
                            {/*  page close icon end here */}
                            <h2>Reset Password</h2>
                            <h3>Enter your details below</h3>
                                    <form onSubmit={this.submitResetPassword} className='reset-password-form'>
                                            {form}
                                            <div className='form-group'>
                                                <button disabled={this.state.loading || !this.state.isValidForm}
                                                type='submit' className='btn btn-primary btn-block'>Reset Password</button>
                                            </div>
                                    </form>
                            </div>
                        </div>
					}
					</div>
				);
		}
}

export default connect()( ResetPassword );
