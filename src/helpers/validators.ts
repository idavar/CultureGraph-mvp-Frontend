import { InputRule } from '../interface/InputRule';
interface ErrorMessage {
	required: string;
	maxLength: string;
	minLength: string;
	isEmail: string;
	isNumeric: string;
}
/**
 * @description function used for check validation rule
 * @param value contain input field value
 * @param rules contain input field rule
 */
export const checkValidite = ( value: string, rules: InputRule, messages: ErrorMessage) => {
		const validationData = {
			isValid: true,
			validationMsg: ''
		};
		if ( !rules ) {
				return validationData;
		}

		if ( rules.required ) {
				const isRequired = value.trim() !== '';
				validationData.isValid = isRequired && validationData.isValid;
				validationData.validationMsg = messages.required;
		}

		if ( rules.minLength ) {
			validationData.isValid = value.length >= rules.minLength && validationData.isValid;
			validationData.validationMsg = messages.minLength;
		}

		if ( rules.maxLength ) {
			validationData.isValid = value.length <= rules.maxLength && validationData.isValid;
			validationData.validationMsg = messages.maxLength;
		}

		if ( rules.isEmail ) {
				const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				validationData.validationMsg = messages.isEmail;
		}

		if ( rules.isNumeric ) {
				const pattern = /^\d+$/;
				validationData.isValid = pattern.test( value ) && validationData.isValid;
				validationData.validationMsg = messages.isNumeric;
		}
		return validationData;
};
