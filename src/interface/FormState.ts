export interface FormState {
	controls;
	successMessage: string;
	errorMessage: string;
	isValidForm: boolean;
	loading: boolean;
	show?: boolean;
	emailId?: string | null;
	token?: string | null;
}
