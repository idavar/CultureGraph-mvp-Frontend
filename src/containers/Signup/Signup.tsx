
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
import { User } from '../../interface/User';

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

const confirmPassword = 'confirm_password';

class Signup extends React.Component<Props> {
		state: State = {
				controls: {
					first_name: {
								elementType: 'input',
								elementConfig: {
										type: 'text',
										placeholder: 'Name'
								},
								value: '',
								validation: {
										required: true,
										maxLength: Common.nameLength
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.first_name
						},
						company: {
								elementType: 'input',
								elementConfig: {
										type: 'text',
										placeholder: 'Company Name'
								},
								value: '',
								validation: {
										required: true,
										maxLength: Common.companyLength
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.company
						},
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
						password: {
								elementType: 'input',
								elementConfig: {
										type: 'password',
										placeholder: 'Password'
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
										placeholder: 'Confirm Password'
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
				loading: false
		};

		inputChangedHandler = ( event: any, controlName: string ) => {
				const rulesData = this.state.controls[controlName].validation;
				const value = event.target.value;
				const messages = this.state.controls[controlName].messages;
				const validationData: ValidationObject = validateRef.checkValidite( value, rulesData, messages );
				this.updateFormControls(validationData, controlName, value);
				if (validationData.isValid && (rulesData.isPassword || rulesData.isConfirmPassword)) {
					setTimeout(() => {
						validateRef.matchConfirmPassword(validationData, rulesData, this.state.controls);
						this.updateFormControls(validationData, confirmPassword, this.state.controls[confirmPassword].value);
					}, Common.zero);
				}
				this.checkFormValid();
		}

		updateFormControls = (validationData: ValidationObject, controlName: string, value: string) => {
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

		removeSignupValidation = (controlName: string) => {
			const updatedControls = {
				...this.state.controls,
				[controlName]: {
						...this.state.controls[controlName],
						touched: false
				}
			};
			this.setState( { controls: updatedControls } );
		}

		submitHandler = ( event: {preventDefault: Function}) => {
				event.preventDefault();
				this.setState({loading: true});
				const userData: User = {
					first_name: this.state.controls.first_name.value,
					last_name: '',
					email: this.state.controls.email.value,
					company: this.state.controls.company.value,
					password: this.state.controls.password.value
				};
				apiReq.signUp(userData).then(response => {
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
								changed={( event: any ) => this.inputChangedHandler( event, formElement.id )}
								removeValidation= {() => this.removeSignupValidation(formElement.id)} />
				) );

				return (
					<div className='user-wrapper signup-wrapper'>
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
							<a href='/'><img src='/assets/images/close.png' alt='Close Icon' /></a>
						</span>
						{/*  page close icon end here */}
						<h2>Sign Up</h2>
						<h3>Welcome back! Please login to your account.</h3>
								<form onSubmit={this.submitHandler}>
										{form}
										<div className='form-group'>
											<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Sign Up</button>
										</div>
								</form>
						</div>
								<span className='account-status'>Already have an account yet? <a href='/login'>Sign In</a></span>
						</div>
					</div>
				);
		}
}

export default connect()( Signup );
