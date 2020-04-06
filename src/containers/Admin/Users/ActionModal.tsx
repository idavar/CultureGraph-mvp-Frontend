import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ActionState {
	show: boolean;
}

class ActionModal extends React.Component<{}, ActionState> {
		constructor(props: {}) {
		super(props);
		this.state = {
			show: false
				};
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (): void => this.setState({show: true});

		render() {
				return (
						<div>
						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
							<Modal.Footer>
								<Button variant='secondary' onClick={this.handleClose}>
									Close
								</Button>
								<Button variant='primary' onClick={this.handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>
						</div>
				);
		}
	}

export default ActionModal;
