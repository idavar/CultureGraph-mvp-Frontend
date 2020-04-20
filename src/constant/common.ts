const Common = {
		phqOffset: 1000,
		phqState: 'active',
		nameLength: 150,
		emailLength: 150,
		minVerifyCodeLength: 5,
		companyLength: 250,
		minPassword: 8,
		maxPassword: 16,
		rejectReasonLength: 200,
		dateFormat: 'MMM DD, YYYY',
		userColSpan:  6,
		requestColSpan:  6,
		minOtp: 5,
		status: {
			processed: 200,
			success: 201,
			methodNotAllowed: 405,
			authentication: 401
		},
		zero: 0,
		one: 1,
		three: 3,
		four: 4,
		alertTimeout: 3000,
		na: 'NA',
		toastConfig : {
			autoClose: 2000,
			draggable: false,
		},
		group: {
			admin: 1,
			researcher: 2
		},
		actionType: {
			request: 'request',
			verified: 'verified'
		},
		pageLimit: 10,
		requestStatus: {
			pending: 1,
			approved: 2,
			rejected: 3
		},
		requestAction: {
			accept: 'accept',
			reject: 'reject',
			edit: 'edit'
		},
		defaultQueryData: {
			viewType: '',
			page: 1,
			next: null,
			previous: null,
			search: null,
			status: null,
			is_active: null,
			ordering: null
		},
		requestTitle: {
			accept: 'Accept Request',
			reject: 'Reject Request',
			edit: 'Change Request Status'
		},
		requestConfirmMsg: {
			accept: 'Are you sure you want to accept this request?',
			reject: 'Are you sure you want to reject this request?',
			edit: 'Are you sure you want to change this request status?'
		},
		userStatusTitle: {
			active: 'Activate User',
			block: 'Block User',
		},
		userStatus: {
			active: 'Are you sure you want to activate this user?',
			block: 'Are you sure you want to block this user?',
		}
};

export default Common;
