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
		thirty: 30,
		sixty: 60,
		ninty: 90,
		defaultLocation: {
			lng: -120.740135, // set default washington state location
			lat: 47.751076
		},
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
		two: 2,
		gridSize: 30,
		clusterIconSize: 54,
		three: 3,
		four: 4,
		five: 5,
		nine: 9,
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
		phqKm: 160,
		phqLimit: 100,
		phpDataLoadIntervel: 10000,
		categoryColor: {
			holidays: '#2dd351',
			sports: '#5cb2eb',
			festivals: '#f58f2c',
			music: '#ffe200',
			food: '#74d5bd',
			art: '#f3aaf8',
			dance: '#c604d6',
			others: '#847de3',
		},
		mapIcon: {
			holidays: '/assets/map-icons/holidays.png',
			sports: '/assets/map-icons/sports.png',
			festivals: '/assets/map-icons/festivals.png',
			music: '/assets/map-icons/music.png',
			food: '/assets/map-icons/food.png',
			art: '/assets/map-icons/art.png',
			others: '/assets/map-icons/others.png',
		},
		clusterIcon: '/assets/map-icons/cluster/m',
		keywordClassOne: ['holi'],
		keywordClassTwo: ['herring', 'hogmanay', 'donauinselfest', 'carnevale',
		'primavera', 'let-it-roll', 'soccer', 'becon', 'tabletennis'],
		keywordColor: ['color_1', 'color_2', 'color_3', 'color_4', 'color_5',
		'color_6', 'color_7', 'color_8', 'color_9', 'color_10'],
		cultureType: {
			map: 'map',
			calendar: 'calendar'
		}
};

export default Common;
