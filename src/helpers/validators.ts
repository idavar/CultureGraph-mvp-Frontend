import { ToastError } from '../components/Alert/Toast';
import { InputRule } from '../interface/InputRule';
import { ValidationObject } from '../interface/ValidationObject';
import { ValidationMessage } from '../constant/error';
import Common from '../constant/common';
interface ErrorMessage {
	required: string;
	maxLength: string;
	minLength: string;
	isEmail: string;
	isNumeric: string;
	isPassword: string;
	isConfirmPassword: string;
	passwordNotMatch: string;
}

/**
 * @description function used for check validation rule
 * @param value contain input field value
 * @param rules contain input field rule
 */
export const checkValidite = (value: string, rules: InputRule, messages: ErrorMessage) => {
		const validationData: ValidationObject = {
			isValid: true,
			validationMsg: ''
		};
		if ( !rules ) {
				return validationData;
		}

		if ( rules.required ) {
				const isRequired = value.trim() !== '';
				validationData.isValid = isRequired && validationData.isValid;
				setErrorMessage(validationData, messages.required, validationData.isValid);
		}

		if ( rules.minLength ) {
			validationData.isValid = value.length >= rules.minLength && validationData.isValid;
			setErrorMessage(validationData, messages.minLength, validationData.isValid);
		}

		if ( rules.maxLength ) {
			validationData.isValid = value.length <= rules.maxLength && validationData.isValid;
			setErrorMessage(validationData, messages.maxLength, validationData.isValid);
		}

		if ( rules.isEmail ) {
				value = value ? value.toLocaleLowerCase() : value;
				const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				setErrorMessage(validationData, messages.isEmail, validationData.isValid);
		}

		if ( rules.isNumeric ) {
				const pattern = /^\d+$/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				setErrorMessage(validationData, messages.isNumeric, validationData.isValid);
		}
		return validationData;
};

export const matchConfirmPassword = (validationData: ValidationObject, rulesData: InputRule, formControls): void => {
	const confirmPassword = formControls['confirm_password'].value;
	const password = formControls['password'].value;
	if (confirmPassword && password !== confirmPassword) {
		validationData.isValid = false;
		validationData.validationMsg = ValidationMessage.confirm_password.passwordNotMatch;
	}
};

const setErrorMessage = (validationData: ValidationObject, msg: string, isValid: boolean): void => {
	if (!validationData.validationMsg && !isValid) {
		validationData.validationMsg = msg;
	}
};

export const getObjectFirstKeyValue = (error) => {
	let val = '';
	if (error && Object.keys(error).length) {
		val = error[Object.keys(error)[Common.zero]][Common.zero];
	}
	return val;
};

export const displayErrorMessage = (response: { data: { detail: string, error: object}}) => {
	let msg = response.data.detail;
	if (!msg)  {
		msg = getObjectFirstKeyValue(response.data.error);
	}
	ToastError({msg});
};
