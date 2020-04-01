export const ValidationMessage = {
	first_name: {
		required: `First name is required.`,
		maxLength: `First name max length can not greater than 50 characters.`,
		minLength: ''
	},
	last_name: {
		required: `Last name is required.`,
		maxLength: `Last name max length can not greater than 50 characters.`,
		minLength: ''
	},
	email: {
		required: `Email address is required.`,
				isEmail: `Enter a valid email address.`,
				maxLength: `First name max length can not greater than 150 characters.`,
		minLength: ''
	},
	company: {
		required: `Company name is required.`,
		maxLength: `Company name max length can not greater than 250 characters.`,
		minLength: ''
	},
	password: {
		required: `Password is required.`,
		maxLength: `Password max length can not greater than 16 characters.`,
		minLength: 'Password max length can not less than 6 characters.',
		isPassword: 'Enter a valid password.'
	},
	confirm_password: {
		required: `Confirm Password is required.`,
		maxLength: `Confirm Password max length can not greater than 16 characters.`,
		minLength: 'Password max length can not less than 6 characters.',
		isConfirmPassword: 'Enter a valid confirm password.',
		passwordNotMatch: 'Password and confirm password does not match.'
	}
};
