import { Error } from './Error';
export interface User {
		id?: number;
		first_name?: string;
		last_name?: string;
		email: string;
		company?: string;
		password?: string;
		token?: string;
		group?: number;
		error?: Error | null;
		loading?: boolean;
		type?: string;
		path?: string;
		authRedirectPath?: string;
}
