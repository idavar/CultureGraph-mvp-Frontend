import React from 'react';
import CultureCalendar from '../Calendar/CultureCalendar';

class Culture extends React.Component {
	render() {
		return (<div className='culture-map-section'>
        <div className='container'>
        <div className='watermark-title-section'>
        <div className='watermark-title'>
            <span>Culture Map</span>
            <h3>Culture Map</h3>
        </div>
        <p>Click on dot to explore results in more detail</p>
        </div>
        {/* <img src='/assets/images/map.png' alt='Map' /> */}

                        <div className='buttons-section'>
                            <div className='buttons'>
                                <a href='/' >Culture Map</a>
                                <a href='/' className='active'>Culture Calendar</a>
                            </div>

                            <div className='event-indicator'>
                                    <div><span><em className='ctg-holidya'></em> Holidays</span></div>
                                    <div><span><em className='ctg-sport'></em> Sports</span></div>
                                    <div><span><em className='ctg-festivals'></em> Festivals</span></div>
                                    <div className='value-more'><span className='more'><em></em> 3 More</span>
                                        <div>
                                        <span><em className='ctg-holidya'></em> Holidays</span>
                                        <span><em className='ctg-sport'></em> Sports</span>
                                        <span><em className='ctg-festivals'></em> Festivals</span>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        {/* <div className='calendar-without-login'>
                        <img src='/assets/images/team.png' alt='Team Icon' />
                        <h4>Become a reseacher to access this calendar</h4>
                        <p>Register yourself as researcher to get complete access to culture calendar.</p>
                            <a href='/register' className='explore-register'>Register Now</a>
                        </div> */}

                        <div className='home-calendar'>
                           <CultureCalendar />
                        </div>
        </div>

    </div>);
	}
}

export default Culture;
