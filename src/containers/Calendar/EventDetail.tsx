import React from 'react';
import Modal from 'react-bootstrap/Modal';
interface EventDetailState {
    show: boolean;
    title: string;
    country: string;
    description: string;
}
class EventDetail extends React.Component<{}, EventDetailState> {
		constructor(props: {}) {
		super(props);
		    this.state = {
                show: false,
                title: '',
                country: '',
                description: ''
			};
		}

		eventClose = (): void => this.setState({show: false});

		openEventDetail = (data): void => {
            this.setState({show: true});
            this.setState({title: data.title});
            this.setState({country: data.country});
            this.setState({description: data.description});
        }

		render() {
				return (
                <div>
                <Modal className='event-detail-modal' show={this.state.show} onHide={this.eventClose}>
                <Modal.Header closeButton>
                <span className='ui-evt-close' onClick={this.eventClose}>X</span>
                <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className='modal-subtitle'>{this.state.description}</span>
                        <br />
                        <span className='modal-subtitle'>
                            <img src="/assets/images/icon-map.png" alt="icon-map"/> {this.state.country}
                        </span>
                    </Modal.Body>
                    </Modal>
                </div>
				);
		}
	}

export default EventDetail;
