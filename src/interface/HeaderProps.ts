
export interface HeaderProps {
		isAuthenticated: boolean;
		isAdmin: boolean;
		full_name?: string;
		onLogout: () => void;
		viewType?: string | null;
}
