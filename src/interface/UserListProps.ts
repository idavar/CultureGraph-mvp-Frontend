import { UserData } from './UserData';
import { SearchQuery } from './SearchQuery';

export interface UserListProps {
	users: UserData[];
	count: number;
	fetchUserList: Function;
	queryData: SearchQuery;
}
