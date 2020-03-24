import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/main.scss';
const phq = require('predicthq');
const client = new phq.Client({access_token: 'Acc3sS-t0keN'});
console.log('client', client);

class CultureCalendar extends React.Component {
	render() {
		return (
		  <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
		)
	}
}

export default CultureCalendar;
