
export interface HeaderProps {
    isAuthenticated: boolean;
	isAdmin: boolean;
	full_name: string | undefined;
	onLogout: () => void;
}
