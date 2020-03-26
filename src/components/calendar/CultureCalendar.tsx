import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../../styles/main.scss';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';

interface EventAppState {
calendarWeekends: boolean;
calendarEvents: EventInput[];
}

class CultureCalendar extends React.Component<{}, EventAppState> {

calendarComponentRef = React.createRef<FullCalendar>();

constructor(props: {}) {
	super(props);
	this.state = {
		calendarWeekends: true,
		calendarEvents: []
	};
}

componentWillMount() {
	this.searchEvents();
}

searchEvents = () => {
	apiReq.predicthqSearchEvent({}).then((res: any) => {
		this.setState({calendarEvents: res['results']});
	}).catch(err => {});
}

render() {
	const calendarOptions = {
			eventLimit: Common.three,
			header: {
				right: 'prev,next today',
				center: 'title',
				left: 'dayGridWeek,dayGridMonth'
			},
			defaultView: 'dayGridWeek',
			plugins: [ dayGridPlugin ],
			ref: this.calendarComponentRef,
			weekends: this.state.calendarWeekends,
			events: this.state.calendarEvents
		};
	return (
		<div className='calander-app'>
		<div className='calander-app-calendar'>
			<FullCalendar {...calendarOptions} />
		</div>
		</div>
	);
}
}

export default CultureCalendar;
