import { InputRule } from '../interface/InputRule';
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
interface ValidationObject {
	isValid: boolean;
	validationMsg?: string;
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
				const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				setErrorMessage(validationData, messages.isEmail, validationData.isValid);
		}

		if ( rules.isNumeric ) {
				const pattern = /^\d+$/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				setErrorMessage(validationData, messages.isNumeric, validationData.isValid);
		}
		passwordValidation({value, rules, messages, validationData});
		return validationData;
};

export const matchConfirmPassword = (validationData: ValidationObject, rulesData: InputRule, formControls: any): void => {
	const confirm_password = formControls['confirm_password'].value;
	const password = formControls['password'].value;
	if (confirm_password && password !== confirm_password) {
		validationData.isValid = false;
		validationData.validationMsg = ValidationMessage.confirm_password.passwordNotMatch;
	}
};

const passwordValidation = (paramObj: { value: string, rules: InputRule, messages: ErrorMessage, validationData: ValidationObject }) => {
	if (paramObj.rules.isPassword) {}
};

const setErrorMessage = (validationData: ValidationObject, msg: string, isValid: boolean): void => {
	if (!validationData.validationMsg && !isValid) {
		validationData.validationMsg = msg;
	}
};

export const getObjectFirstKeyValue = (error: any) => {
	let val = '';
	if (Object.keys(error).length) {
		val = error[Object.keys(error)[Common.zero]][Common.zero];
	}
	return val;
};
