const Common = {
		three: 4,
		phqOffset: 1000,
		phqState: 'active',
		nameLength: 150,
		emailLength: 150,
		companyLength: 250,
		minPassword: 6,
		maxPassword: 16,
		status: {
			processed: 200,
			success: 201,
			methodNotAllowed: 405,
		},
		zero: 0,
		one: 1,
		alertTimeout: 3000,
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
		requestTitle: {
			accept: 'Accept Request',
			reject: 'Reject Request',
			edit: 'Change Request Status'
		},
		requestConfirmMsg: {
			accept: 'Are you sure you want to accept this request?',
			reject: 'Are you sure you want to reject this request?',
			edit: 'Are you sure you want to change this request status?'
		}
};

export default Common;
