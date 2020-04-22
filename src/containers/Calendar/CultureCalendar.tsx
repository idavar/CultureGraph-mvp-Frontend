import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../assets/styles/main.scss';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';
const $ = require( 'jquery' );

interface EventAppState {
calendarWeekends: boolean;
calendarEvents: EventInput[];
currentStart?: string;
currentEnd?: string;
loading: boolean;
}

class CultureCalendar extends React.Component<{}, EventAppState> {
	public currentStart = '';
	public currentEnd = '';
	calendarComponentRef = React.createRef<FullCalendar>();

	constructor(props: {}) {
		super(props);
		this.state = {
			calendarWeekends: true,
			calendarEvents: [],
			currentStart: '',
			currentEnd: '',
			loading: false
		};
	}

componentWillMount() {}

componentDidMount() {
		if (this.calendarComponentRef.current) {
			this.currentStart = this.calendarComponentRef.current['calendar'].view.currentStart.toLocaleDateString();
			this.currentEnd = this.calendarComponentRef.current['calendar'].view.currentEnd.toLocaleDateString();
			this.searchEvents();
		}
		this.addShowMoreAndLessEvent();
}

addShowMoreAndLessEvent = () => {
		$('body').on('click', '.show-more', function(e: any) {
			$(e.target).closest('.fc-description').find('.fc-des-less').addClass('ui-hide');
			$(e.target).closest('.fc-description').find('.fc-des-more').removeClass('ui-hide');
		});
		$('body').on('click', '.hide-more', function(e: any) {
			$(e.target).closest('.fc-description').find('.fc-des-less').removeClass('ui-hide');
			$(e.target).closest('.fc-description').find('.fc-des-more').addClass('ui-hide');
		});
}

strReplace = (str: string) => {
	return str.replace(/\//g, '-');
}

searchEvents = (options: {query: string, next: string} = {query: '', next: ''}) => {
	let currentStart = '';
	let currentEnd = '';
	currentStart = this.state.currentStart ? this.state.currentStart : this.currentStart;
	currentStart = this.strReplace(currentStart);
	currentEnd = this.state.currentEnd ? this.state.currentEnd : this.currentEnd;
	currentEnd = this.strReplace(currentEnd);
	if (!options.next) {
		this.setState({ calendarEvents: [] });
		options['query'] = `?category=${Common.allCategory}&active.gt=${currentStart}
		&active.lte=${currentEnd}&state=${Common.phqState}&sort=rank`;
	}
	if (!currentStart || !currentEnd) {
		return;
	}
	this.setState({loading: true});
	apiReq.predicthqSearchEvent({}, options).then((res: any) => {
		this.setState({ calendarEvents: this.state.calendarEvents.concat(res['results']) });
		if (res.next) {
			options.next = res.next;
			this.searchEvents(options);
		} else {
			this.setState({loading: false});
		}
	}).catch(err => {
		this.setState({loading: false});
	});
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
			if (data['view'].currentStart && data['view'].currentEnd) {
				this.setState({ currentStart: data['view'].currentStart.toLocaleDateString() });
				this.setState({ currentEnd: data['view'].currentEnd.toLocaleDateString() });
				this.searchEvents();
			}
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
			let lessDescription = extendedProps.description;
			let moreDescription = extendedProps.description;
			let uiHide = 'ui-hide';
			if (extendedProps.description.length > Common.phqDesLength) {
				lessDescription = `${extendedProps.description.substring(Common.zero, Common.phqDesLength)}
				...`;
				moreDescription = `${extendedProps.description}`;
				uiHide = '';
			}
			const fcContent = arg.el.querySelector('.fc-content');
			if (fcContent) {
				fcContent.innerHTML = `
				<span class='fc-title'>${arg.event.title}</span>
				<span class='fc-description'>
					<span class='fc-des-more ui-hide'>
						${moreDescription}
						<a class='hide-more'>Hide</a>
					</span>
					<span class='fc-des-less'>
						${lessDescription}
						<a class='show-more ${uiHide}'>Show More</a>
					</span>
				</span>
				<span class='fc-location'><span class='fc-location-icon'></span>
				${extendedProps.country}</span>
				`;
			}
		}
	};
	return (
		<div>
			{this.state.loading ? <div className='calendar-loader'>
				<img src='/assets/images/loader.gif' alt='Loader Icon' />
			</div> : ''}
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
