import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UserData } from '../../../interface/UserData';
import Common from '../../../constant/common';

interface ActionState {
	show: boolean;
	title: string;
	altMessage: string;
	requestAction: string;
}

class ActionModal extends React.Component<{}, ActionState> {
		constructor(props: {}) {
		super(props);
		this.state = {
			show: false,
			title: '',
			altMessage: '',
			requestAction: ''
			};
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (data: UserData, requestAction: string): void => {
			this.setState({requestAction});
			if (Common.requestAction.accept === requestAction) {
				this.setState({title: Common.requestTitle.accept});
				this.setState({altMessage: Common.requestConfirmMsg.accept});
			} else if (Common.requestAction.reject === requestAction) {
				this.setState({title: Common.requestTitle.reject});
				this.setState({altMessage: Common.requestConfirmMsg.reject});
			} else {
				this.setState({title: Common.requestTitle.edit});
				this.setState({altMessage: Common.requestConfirmMsg.edit});
			}
			this.setState({show: true});
		}

		render() {
				return (
						<div>
						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
				<Modal.Title>{this.state.title}</Modal.Title>
							</Modal.Header>
							<Modal.Body>{this.state.altMessage}</Modal.Body>
							<Modal.Footer>
								<Button variant='primary' onClick={this.handleClose}>
									Save Changes
								</Button>
								<Button variant='secondary' onClick={this.handleClose}>
									Cancel
								</Button>
							</Modal.Footer>
						</Modal>
						</div>
				);
		}
	}

export default ActionModal;
