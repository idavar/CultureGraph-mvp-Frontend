import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { store } from '../../store/store';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';
import { ValidationMessage } from '../../constant/error';
import { FormState } from '../../interface/FormState';
import { ValidationObject } from '../../interface/ValidationObject';
import * as session from '../../store/actions/session';
interface UpdateUserProps {
    isAuthenticated: boolean;
}
const {dispatch} = store;
class UpdateProfile extends React.Component<UpdateUserProps, FormState> {
		constructor(props: UpdateUserProps) {
		super(props);
			this.state = {
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
									placeholder: 'Email Id',
									readOnly: true
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
				show: false
			};
        }

        componentDidMount() {}

        /**
         * @description get user  data for check user profile is valid or not
         */
        getUserData = () => {
            apiReq.getProfile().then(result => {
                const dataObj = result.data.data;
                if (dataObj) {
                    const validationObj = {isValid: true, validationMsg: ''};
                    this.resetFormControls(validationObj, 'first_name', dataObj.first_name);
                    this.resetFormControls(validationObj, 'company', dataObj.company);
                    this.resetFormControls(validationObj, 'email', dataObj.email);
                }
            });
        }

		changedFormHandler = ( event: any, controlName: string ) => {
			const rulesData = this.state.controls[controlName].validation;
			const value = event.target.value;
			const messages = this.state.controls[controlName].messages;
			const validationData: ValidationObject = validateRef.checkValidite( value, rulesData, messages );
			this.resetFormControls(validationData, controlName, value);
			this.checkValidForm();
		}

		checkValidForm(): void {
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

		popupClose = (): void => {
			this.setState({show: false});
		}

		updateProfile = (): void => {
            this.getUserData();
			this.setState({show: true});
		}

        submitUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			this.setState({loading: true});
			const fData = {
                first_name: this.state.controls.first_name.value,
                last_name: '',
                company: this.state.controls.company.value,
			};
			apiReq.updateProfile(fData).then(response => {
				this.popupClose();
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					const resResult = response.data;
					const user = session.getUserData();
					user.full_name = resResult.data.full_name;
					session.saveUserData(user);
					dispatch(actions.authSuccess(user) as never);
					this.setState({successMessage: response.data.detail});
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

		/**
		 * @description function used for redirect on home page
		 */
		rootRedirect = () => {
			if (this.state.successMessage) {
			  return <Redirect to='/' />;
			}
		  }

		render() {
				const eleFormArray = [];
				for ( const key in this.state.controls ) {
					if (this.state.controls[key]) {
						eleFormArray.push( {
							id: key,
							config: this.state.controls[key]
						} );
					}
				}

				const form = eleFormArray.map( formElement => (
						<Input
								key={formElement.id}
								elementType={formElement.config.elementType}
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched={formElement.config.touched}
								validationMsg={formElement.config.validationMsg}
								changed={( event: any ) => this.changedFormHandler( event, formElement.id )} />
				) );
				return (
				<div>
				{this.rootRedirect()}
				<Modal show={this.state.show} onHide={this.popupClose} className='change-password'>
                <Modal.Header closeButton>
				<Modal.Title>Update Profile</Modal.Title>
					<span className='modal-subtitle'></span>
					</Modal.Header>
					<form onSubmit={this.submitUpdateProfile}>
						<Modal.Body>
								{form}
						</Modal.Body>
						<Modal.Footer>
						<Button className='btn-outline'  onClick={this.popupClose}>
							Cancel
						</Button>
						<Button className='btn-action' disabled={this.state.loading || !this.state.isValidForm} type='submit' >
							Save Changes
						</Button>
						</Modal.Footer>
					</form>
				</Modal>
				</div>
				);
		}
	}

export default UpdateProfile;
