
import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { User } from '../../interface/User';
import { History } from 'history';

interface State {
	controls: any;
}

interface Props {
	history: History;
}

class Signup extends React.Component<Props> {
		state: State = {
				controls: {
					first_name: {
								elementType: 'input',
								elementConfig: {
										type: 'text',
										placeholder: 'First Name'
								},
								value: '',
								validation: {
										required: true,
										maxLength: 50
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.first_name
						},
					last_name: {
								elementType: 'input',
								elementConfig: {
										type: 'text',
										placeholder: 'Last Name'
								},
								value: '',
								validation: {
										required: true,
										maxLength: 50
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.last_name
						},
						email: {
								elementType: 'input',
								elementConfig: {
										type: 'email',
										placeholder: 'Mail Address'
								},
								value: '',
								validation: {
										required: true,
										isEmail: true,
										maxLength: 150
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.email
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
										maxLength: 250
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
										minLength: 6,
										maxLength: 16,
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
										minLength: 6,
										maxLength: 16,
										isConfirmPassword: true
								},
								valid: false,
								touched: false,
								validationMsg: '',
								messages: ValidationMessage.confirm_password
						}
				}
		};

		inputChangedHandler = ( event: any, controlName: string ) => {
				const validationData: {isValid: boolean, validationMsg: string}
				= validateRef.checkValidite( event.target.value, this.state.controls[controlName].validation,
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
		}


		submitHandler = ( event: {preventDefault: Function}) => {
				event.preventDefault();
				const userData: User = {
					first_name: this.state.controls.first_name.value,
					last_name: this.state.controls.last_name.value,
					email: this.state.controls.email.value,
					company: this.state.controls.company.value,
					password: this.state.controls.password.value
				};
				apiReq.signUp(userData).then(response => {
						this.props.history.push('/login');
				}).catch(err => {});
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
								changed={( event: any ) => this.inputChangedHandler( event, formElement.id )} />
				) );

				return (
						<div className=''>
								<form onSubmit={this.submitHandler}>
										{form}
										<button>SUBMIT</button>
								</form>
						</div>
				);
		}
}

export default connect()( Signup );
