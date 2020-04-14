
import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import '../../assets/styles/style.scss';

import Input from '../../components/UI/Input/Input';
import OurMission from '../../components/common/OurMission';
import { ToastSuccess, ToastError } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';

interface State {
	controls: any;
	successMessage: string;
	errorMessage: string;
	isValidForm: boolean;
	loading: boolean;
}

interface Props {
	history: History;
}

interface ValidationObject {
	isValid: boolean;
	validationMsg?: string;
}

class ForgotPassword extends React.Component<Props> {
		state: State = {
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
				apiReq.signUp(userEmail).then(response => {
					this.setState({loading: false});
					if (response.status === Common.status.success || response.status === Common.status.processed) {
						ToastSuccess({msg: response.data.detail});
						this.props.history.push('/login');
					} else {
						let msg = response.data.detail;
						if (!msg)  {
							msg = validateRef.getObjectFirstKeyValue(response.data.error);
						}
						ToastError({msg});
					}
				}).catch(err => {
					this.setState({loading: false});
					let msg = err.response.data.detail;
					if (!msg)  {
						msg = validateRef.getObjectFirstKeyValue(err.response.data.error);
					}
					ToastError({msg});
				});
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
					<div className='user-form'>
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
						</div>
					</div>
				);
		}
}

export default connect()( ForgotPassword );
