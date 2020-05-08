import React from 'react';
import Modal from 'react-bootstrap/Modal';
interface EventDetailState {
    show: boolean;
}
class EventDetail extends React.Component<{}, EventDetailState> {
		constructor(props: {}) {
		super(props);
		    this.state = {
                show: false
			};
		}

		eventClose = (): void => this.setState({show: false});

		openEventDetail = (data): void => {
            this.setState({show: true});
        }

		render() {
				return (
                <div>
                    <Modal show={this.state.show} onHide={this.eventClose}>
                        <div className='fc-popover fc-more-popover'>
                            <div className='fc-header fc-widget-header'>
                                <span className='fc-title'>April 6, 2020</span>
                                <span className='fc-close fc-icon fc-icon-x'></span>
                            </div>
                            <div className='fc-body fc-widget-content'>
                                <div className='fc-event-container'>
                                    <div className='fc-content'>
                                        <span className='fc-title'></span>
                                        <span className='fc-description"\'></span>
                                        <span className='fc-location'><span className='fc-location-icon'></span>US</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Modal>
                </div>
				);
		}
	}

export default EventDetail;
