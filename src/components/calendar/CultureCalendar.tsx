import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../../styles/main.scss';
import { apiReq } from '../../helpers';

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
	return (
		<div className='calander-app'>
		<div className='calander-app-calendar'>
			<FullCalendar
			defaultView='dayGridMonth'
			header={{
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			}}
			plugins={[ dayGridPlugin ]}
			ref={ this.calendarComponentRef }
			weekends={ this.state.calendarWeekends }
			events={ this.state.calendarEvents }
			/>
		</div>
		</div>
	);
}
}

export default CultureCalendar;
