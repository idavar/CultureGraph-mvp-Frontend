import { UserData } from './UserData';

export interface UserListProps {
	users: UserData[];
	count: number;
	page: number;
	fetchUserList: Function;
}
