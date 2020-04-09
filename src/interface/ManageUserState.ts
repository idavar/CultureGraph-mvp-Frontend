import { UserData } from './UserData';

export interface ManageUserState {
	viewType: string | null;
	users: UserData[];
	count: number;
	next: string | null;
	previous: string | null;
	loading: boolean;
}
