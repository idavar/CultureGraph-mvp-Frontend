export interface UserData {
		id?: number;
		full_name?: string;
		first_name?: string;
		last_name?: string;
		email: string;
		company?: string;
		token?: string;
		group?: number;
		reject_reason: {
			description?: string;
			created_at?: string;
		} | null;
		status: number;
		is_active: boolean;
		created_at: string;
		updated_at: string;
		request_updated_at: string;
}
