import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';

interface AuthState {
		controls: any;
}

interface Props {
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
												placeholder: 'Mail Address'
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
						}
				};
		}

		inputChangedHandler = ( event: any, controlName: string ) => {
				const validationData: {isValid: boolean, validationMsg: string}	= validateRef.checkValidite( event.target.value, this.state.controls[controlName].validation,
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

		submitHandler = (event: any) => {
				event.preventDefault();
				this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
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

const mapStateToProps = (state: any) => {
		return {
				loading: state.auth.loading,
				error: state.auth.error
		};
};

const mapDispatchToProps = (dispatch: Function) => {
		return {
				onAuth: (email: string, password: string) =>  dispatch(actions.auth( email, password ))
		};
};

export default connect(mapStateToProps, mapDispatchToProps)( Auth );
