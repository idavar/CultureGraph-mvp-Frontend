import React from 'react';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	} from 'reactstrap';
import { Category } from './../../interface/Category';
import { apiReq } from '../../helpers';
import CultureCalendar from '../Calendar/CultureCalendar';
// import CultureMap from '../CultureMap';
import GMap from '../CultureMap/GMap';
import Common from '../../constant/common';

interface CultureProp {
    isAuthenticated: boolean;
    cultureType: string | null;
}
interface CultureState {
    partOneCategories: Array<Category>;
    partTwoCategories: Array<Category>;
    isShowCategory: boolean;
}

class Culture extends React.Component<CultureProp, CultureState> {
    dropdownRef = React.createRef<HTMLDivElement>();
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
    <span>{(this.props.cultureType === Common.cultureType.map) ? 'Culture Map' : 'Culture Calendar'}</span>
            <h3>{(this.props.cultureType === Common.cultureType.map) ? 'Culture Map' : 'Culture Calendar' }</h3>
        </div>
        <p>Click on tab to explore results in more detail</p>
        </div>
        {/* <img src='/assets/images/map.png' alt='Map' /> */}

                        <div className='buttons-section'>
                            <div className='buttons'>
                                <a href='?type=map#culture-map'
                                className={(this.props.cultureType === Common.cultureType.map) ? 'active' : ''}>Culture Map</a>
                                <a href='?type=calendar#culture-map'
                                className={(this.props.cultureType === Common.cultureType.calendar) ? 'active' : ''}>
                                    Culture Calendar</a>
                            </div>
                            <div className='event-indicator'>
                                    {
                                        this.state.partOneCategories.map((cat: Category) => (
                                        <div key={cat.id}><span><em className={cat.class_name}></em> {cat.name}</span></div>
                                        ))
                                    }
                                    <div>

                                            <UncontrolledDropdown>
                                                <div> <span><DropdownToggle nav className=' m-dropdown caret'>
                                                {this.state.partTwoCategories.length} More
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    {
                                                         this.state.partTwoCategories.map((cat: Category) => (
                                                            <span key={cat.id}><em className={cat.class_name}></em> {cat.name}</span>
                                                        ))
                                                    }
                                                </DropdownMenu>
                                                </span>
                                                </div>
                                            </UncontrolledDropdown>

                                    </div>
                            </div>
                        </div>
                        {(this.props.cultureType === Common.cultureType.map)
                        ?
                            <div className='culture-map'>
                                <GMap />
                            </div>
                        : <div>
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
                        }
        </div>

    </div>);
	}
}

export default Culture;
