export const ValidationMessage = {
	first_name: {
		required: `Name is required.`,
		maxLength: `Name should be of maximum 150 characters.`,
		minLength: ''
	},
	email: {
		required: `Email address is required.`,
				isEmail: `Enter a valid email address.`,
				maxLength: `Email should be of maximum 150 characters.`,
		minLength: ''
	},
	company: {
		required: `Company name is required.`,
		maxLength: `Company name max length can not greater than 250 characters.`,
		minLength: ''
	},
	old_password: {
		required: `Old Password is required.`,
		maxLength: `Old Password should be of maximum 16 characters.`,
		minLength: 'Old Password should be of minimum 8 characters.',
		isPassword: 'Enter a valid old password.'
	},
	password: {
		required: `Password is required.`,
		maxLength: `Password should be of maximum 16 characters.`,
		minLength: 'Password should be of minimum 8 characters.',
		isPassword: 'Enter a valid password.'
	},
	confirm_password: {
		required: `Confirm Password is required.`,
		maxLength: `Confirm Password should be of maximum 16 characters.`,
		minLength: 'Password should be of minimum 8 characters.',
		isConfirmPassword: 'Enter a valid confirm password.',
		passwordNotMatch: 'Password and confirm password does not match.'
	}
};
