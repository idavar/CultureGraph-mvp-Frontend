import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from './../../interface/Category';
import { apiReq } from '../../helpers';
import CultureCalendar from '../Calendar/CultureCalendar';
import Common from '../../constant/common';

interface CultureProp {
	isAuthenticated: boolean;
}
interface CultureState {
    partOneCategories: Array<Category>;
    partTwoCategories: Array<Category>;
    isShowCategory: boolean;
}

class Culture extends React.Component<CultureProp, CultureState> {
    constructor(props: CultureProp) {
		super(props);
		this.state = {
            partOneCategories: [],
            partTwoCategories: [],
            isShowCategory: false
		};
    }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList = () => {
        apiReq.getCategory().then((res) => {
            const resData = res.data;
            this.setState({ partOneCategories: resData.data.slice(Common.zero, Common.three) });
            this.setState({ partTwoCategories: resData.data.slice(Common.three, resData.data.length) });
        }).catch(err => {});
    }

    categoryToggle = () => {
        this.setState({isShowCategory: !this.state.isShowCategory});
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
                                {
                                    this.state.partOneCategories.map((cat: Category) => (
                                    <div key={cat.id}><span><em className={cat.class_name}></em> {cat.name}</span></div>
                                    ))
                                }
                                    <div className='value-more'><span className='more' onClick={this.categoryToggle}><em></em>
                                    {this.state.partTwoCategories.length} More</span>
                                        <div className={this.state.isShowCategory ? '' : 'ui-hide'}>
                                        {
                                            this.state.partTwoCategories.map((cat: Category) => (
                                                <span key={cat.id}><em className={cat.class_name}></em> {cat.name}</span>
                                            ))
                                        }
                                        </div>
                                    </div>
                            </div>
                        </div>
                        {
                            this.props.isAuthenticated ? <div className='home-calendar'>
                              {/* <div className='calendar-loader'>
                                <img src='/assets/images/loader.gif' alt='Loader Icon' />
                                </div> */}
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
