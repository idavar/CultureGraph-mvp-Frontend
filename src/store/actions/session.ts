import Common from '../../constant/common';

export const getUserData = () => {
	return JSON.parse(localStorage.getItem('user') || '{}');
};

export const isAdminUser = () => {
	const user = getUserData();
	return user && user.group === Common.group.admin;
};

export const getToken = () => {
	const user = getUserData();
	return (user && user.token) ? user.token : '';
};
