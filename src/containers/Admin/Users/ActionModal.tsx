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
				// 		<div>
				// 		<Modal show={this.state.show} onHide={this.handleClose}>
				// 			<Modal.Header closeButton>
				// <Modal.Title>Reject Request</Modal.Title>
				// <span className='modal-subtitle'>Are you sure you want to reject this request?</span>
				// 			</Modal.Header>
				// 			<Modal.Body>
				// 				<form>
				// 					<textarea placeholder='Add Comment' className='reject-comment' ></textarea>
				// 				</form>
				// 				</Modal.Body>
				// 			<Modal.Footer>
				// 				<Button className='btn-outline'  onClick={this.handleClose}>
				// 					Reject Request
				// 				</Button>
				// 				<Button className='btn-action' onClick={this.handleClose}>
				// 					Cancel
				// 				</Button>
				// 			</Modal.Footer>
				// 		</Modal>
				// 		</div>

				<div>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
		<Modal.Title>Change Request Status</Modal.Title>
		<span className='modal-subtitle'>Are you sure you want to change this request status?</span>
					</Modal.Header>
					<Modal.Body>
					<p>Reason for rejecting request</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
						<div className=''>
						<p>Change Request Status</p>
						<div className='custom-radio request-radio'>
						<label className='radio-rejected'>
							<input type='radio' name='request-status'></input> Rejected
							<span></span>
						</label>
						<label className='radio-approve'>
							<input type='radio' name='request-status'></input> Approve
							<span></span>
						</label>
						</div>
						</div>
						</Modal.Body>
					<Modal.Footer>
						<Button className='btn-outline'  onClick={this.handleClose}>
						Cancel
						</Button>
						<Button className='btn-action' onClick={this.handleClose}>
						Save Request Status
						</Button>
					</Modal.Footer>
				</Modal>
				</div>
				);
		}
	}

export default ActionModal;
