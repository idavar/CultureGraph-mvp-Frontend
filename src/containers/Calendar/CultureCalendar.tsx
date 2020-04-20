import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../../assets/styles/main.scss';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';

interface EventAppState {
calendarWeekends: boolean;
calendarEvents: EventInput[];
currentStart?: string;
currentEnd?: string;
}

class CultureCalendar extends React.Component<{}, EventAppState> {

calendarComponentRef = React.createRef<FullCalendar>();

constructor(props: {}) {
	super(props);
	this.state = {
		calendarWeekends: true,
		calendarEvents: [],
		currentStart: '',
		currentEnd: ''
	};
}

componentWillMount() {}

componentDidMount() {
	if (this.calendarComponentRef.current) {
		this.setState({ currentStart: this.calendarComponentRef.current['calendar'].view.currentStart.toLocaleDateString() });
		this.setState({ currentEnd: this.calendarComponentRef.current['calendar'].view.currentEnd.toLocaleDateString() });
		this.searchEvents();
	}
}

searchEvents = (options: {query: string, next: string} = {query: '', next: ''}) => {
	if (!options.next) {
		this.setState({ calendarEvents: [] });
		options['query'] = `?active.gt=${this.state.currentStart}&active.lte=${this.state.currentEnd}&state=${Common.phqState}`;
	}
	apiReq.predicthqSearchEvent({}, options).then((res: any) => {
		this.setState({ calendarEvents: this.state.calendarEvents.concat(res['results']) });
		if (res.next) {
			options.next = res.next;
			this.searchEvents(options);
		}
	}).catch(err => {});
}

render() {
	const calendarOptions = {
		eventLimit: Common.three,
		header: {
			left: 'none',
			center: 'prev, title ,next',
			right: 'dayGridWeek,dayGridMonth'
		},
		defaultView: 'dayGridMonth',
		plugins: [ dayGridPlugin ],
		ref: this.calendarComponentRef,
		weekends: this.state.calendarWeekends,
		datesRender: (data: {view: {currentEnd: Date, currentStart: Date}}) => {
			this.setState({ currentStart: data['view'].currentStart.toLocaleDateString() });
			this.setState({ currentEnd: data['view'].currentEnd.toLocaleDateString() });
			this.searchEvents();
		},
		eventSources: [{
			events: this.state.calendarEvents.map(item => {
				item.color = Common.categoryColor.orthers;
				if (Common.categoryGroup.holidays.includes(item.category)) {
					item.color = Common.categoryColor.holidays;
				} else if (Common.categoryGroup.art.includes(item.category)) {
					item.color = Common.categoryColor.art;
				} else if (Common.categoryGroup.festivals.includes(item.category)) {
					item.color = Common.categoryColor.festivals;
				} else if (Common.categoryGroup.food.includes(item.category)) {
					item.color = Common.categoryColor.food;
				} else if (Common.categoryGroup.music.includes(item.category)) {
					item.color = Common.categoryColor.music;
				} else if (Common.categoryGroup.sports.includes(item.category)) {
					item.color = Common.categoryColor.sports;
				}
				return item;
			})
		}],
		eventRender: (arg: { event: any; el: HTMLElement; view: any}) => {
			const extendedProps = arg.event.extendedProps;
			const fcContent = arg.el.querySelector('.fc-content');
			if (fcContent) {
				fcContent.innerHTML = `
				<span class='fc-title'>${arg.event.title}</span>
				<span class='fc-description'>${extendedProps.description}</span>
				<span class='fc-location'><span class='fc-location-icon'></span>
				${extendedProps.country}</span>
				`;
			}
		}
	};
	return (
		<div>

					<section>
						<div className='calander-app'>
							<div className='calander-app-calendar'>
								{<FullCalendar {...calendarOptions} />}
							</div>
						</div>
					</section>

		</div>
	);
}
}

export default CultureCalendar;
