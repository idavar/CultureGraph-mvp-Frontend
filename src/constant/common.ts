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
		phqDesLength: 70,
		status: {
			processed: 200,
			success: 201,
			methodNotAllowed: 405,
			authentication: 401,
			noPermission: 403,
			badRequest: 400
		},
		zero: 0,
		one: 1,
		three: 3,
		four: 4,
		ten: 10,
		alertTimeout: 3000,
		pageTimeout: 2500,
		na: 'NA',
		toastConfig : {
			autoClose: 7000,
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
		},
		categoryGroup: {
			holidays: ['public-holidays', 'school-holidays'],
			sports: ['sports'],
			festivals: ['festivals'],
			music: ['music'],
			food: ['food'],
			art: ['performing-arts'],
			others: ['observances', 'politics', 'conferences', 'expos', 'concerts',
						'community', 'daylight-savings', 'airport-delays', 'severe-weather',
					'disasters', 'terror'],
		},
		allCategory: `school-holidays,public-holidays,observances,politics,conferences,expos,concerts,
		festivals,performing-arts,sports,community,daylight-savings,airport-delays,severe-weather,
		disasters,terror`,
		phqMile: 100,
		phqKm: 12000,
		categoryColor: {
			holidays: '#72cfa0',
			sports: '#009cdc',
			festivals: '#004d63',
			music: '#edc81b',
			food: '#00C1AD',
			art: '#7168B6',
			others: '#642353',
		},
		keywordClassOne: ['holi'],
		keywordClassTwo: ['herring', 'hogmanay', 'donauinselfest', 'carnevale',
		'primavera', 'let-it-roll', 'soccer', 'becon', 'tabletennis'],
		keywordColor: ['color_1', 'color_2', 'color_3', 'color_4', 'color_5',
		'color_6', 'color_7', 'color_8', 'color_9', 'color_10']
};

export default Common;
