import React from 'react';
import { Link } from 'react-router-dom';
import CultureCalendar from '../Calendar/CultureCalendar';

interface CultureProp {
	isAuthenticated: boolean;
}

class Culture extends React.Component<CultureProp> {
    constructor(props: CultureProp) {
		super(props);
		this.state = {
		};
    }

	render() {
		return (<div className='culture-map-section'>
        <div className='container'>
        <div className='watermark-title-section'>
        <div className='watermark-title'>
            <span>Culture Calendar</span>
            <h3>Culture Calendar</h3>
        </div>
        <p>Click on dot to explore results in more detail</p>
        </div>
        {/* <img src='/assets/images/map.png' alt='Map' /> */}

                        <div className='buttons-section'>
                            <div className='buttons'>
                                <Link to='#' >Culture Map</Link>
                                <Link to='#' className='active'>Culture Calendar</Link>
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
                        {
                            this.props.isAuthenticated ? <div className='home-calendar'>
                            <CultureCalendar />
                         </div> :
                        <div className='calendar-without-login'>
                            <img src='/assets/images/team.png' alt='Team Icon' />
                            <h4>Become a reseacher to access this calendar</h4>
                            <p>Register yourself as researcher to get complete access to culture calendar.</p>
                            <a href='/register' className='explore-register'>Register Now</a>
                        </div>
                        }
        </div>

    </div>);
	}
}

export default Culture;
