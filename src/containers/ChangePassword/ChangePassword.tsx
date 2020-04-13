import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Input from '../../components/UI/Input/Input';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';

interface ChangePasswordState {
	controls: any;
	successMessage: string;
	errorMessage: string;
	isValidForm: boolean;
    loading: boolean;
    show: boolean;
}

interface ValidationObject {
	isValid: boolean;
	validationMsg?: string;
}

const confirmPassword = 'confirm_password';

class ChangePassword extends React.Component<{}, ChangePasswordState> {
		constructor(props: {}) {
		super(props);
			this.state = {
				controls: {
						old_password: {
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
								messages: ValidationMessage.old_password
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
				loading: false,
				show: false
			};
		}

		formChangedHandler = ( event: any, controlName: string ) => {
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

		handleClose = (): void => this.setState({show: false});

		changePassword = (): void => {
			this.setState({show: true});
		}

        submitChangePassword = (event: {preventDefault: Function}) => {
			event.preventDefault();
			this.setState({loading: true});
			const formData = {
				old_password: this.state.controls.old_password.value,
				password: this.state.controls.password.value
			};
			apiReq.changePassword(formData).then(response => {
				this.handleClose();
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					ToastSuccess({msg: response.data.detail});
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
				const formEleArray = [];
				for ( const key in this.state.controls ) {
					if (this.state.controls[key]) {
						formEleArray.push( {
							id: key,
							config: this.state.controls[key]
						} );
					}
				}

				const form = formEleArray.map( formElement => (
						<Input
								key={formElement.id}
								elementType={formElement.config.elementType}
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched={formElement.config.touched}
								validationMsg={formElement.config.validationMsg}
								changed={( event: any ) => this.formChangedHandler( event, formElement.id )} />
				) );
				return (
				<div>
				<Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
								<Modal.Title>Change Password</Modal.Title>
								<span className='modal-subtitle'></span>
								</Modal.Header>
								<Modal.Body>
									<form onSubmit={this.submitChangePassword}>
											{form}
											<div className='form-group'>
												<button disabled={this.state.loading || !this.state.isValidForm} type='submit' className='btn btn-primary btn-block'>Change Password</button>
											</div>
									</form>
									</Modal.Body>
								<Modal.Footer>
								</Modal.Footer>
				</Modal>
				</div>
				);
		}
	}

export default ChangePassword;
