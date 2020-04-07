import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastSuccess, ToastError } from '../../../components/Alert/Toast';
import { UserData } from '../../../interface/UserData';
import Common from '../../../constant/common';
import { apiReq, validateRef } from '../../../helpers';

interface ActionState {
	show: boolean;
	title: string;
	altMessage: string;
	requestAction: string;
	loading: boolean;
	data: Partial<UserData>;
}

class ActionModal extends React.Component<{}, ActionState> {
		constructor(props: {}) {
		super(props);
		this.state = {
			show: false,
			title: '',
			altMessage: '',
			requestAction: '',
			data: {},
			loading: false
			};
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (data: UserData, requestAction: string): void => {
			this.setState({requestAction});
			this.setState({data});
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

		acceptRequestRequest = (status: number) => {
			if (!this.state.data.id) {
				return;
			}
			this.setState({loading: true});
			apiReq.changeStatus(this.state.data.id, {status, is_active: true, text: 'test'}).then(response => {
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					ToastSuccess({msg: response.data.detail});
					this.handleClose();
				} else {
					let msg = response.data.detail;
					if (!msg)  {
						msg = validateRef.getObjectFirstKeyValue(response.data.error);
					}
					ToastError({msg});
				}
			}).catch(err => {
				this.setState({loading: false});
				let msg = err.response.data.detail;
				if (!msg)  {
					msg = validateRef.getObjectFirstKeyValue(err.response.data.error);
				}
				ToastError({msg});
			});
		}

		render() {
			let modalHtml = null;
			if (Common.requestAction.accept === this.state.requestAction) {
				modalHtml = <div><Modal.Header closeButton>
							<Modal.Title>{this.state.title}</Modal.Title>
							<span className='modal-subtitle'>{this.state.altMessage}</span>
							</Modal.Header>
							<Modal.Body></Modal.Body>
							<Modal.Footer>
								<Button className='btn-outline' onClick={() => {this.acceptRequestRequest(Common.requestStatus.approved); }} disabled={this.state.loading}>
									Accept Request
								</Button>
								<Button className='btn-action' onClick={this.handleClose}>
									Cancel
								</Button>
							</Modal.Footer></div>;
			} else if (Common.requestAction.reject === this.state.requestAction) {
				modalHtml = <div><Modal.Header closeButton>
								<Modal.Title>{this.state.title}</Modal.Title>
								<span className='modal-subtitle'>{this.state.altMessage}</span>
								</Modal.Header>
								<Modal.Body>
									<form>
										<textarea placeholder='Add Comment' className='reject-comment' ></textarea>
									</form>
									</Modal.Body>
								<Modal.Footer>
									<Button className='btn-outline' onClick={() => {this.acceptRequestRequest(Common.requestStatus.rejected); }} disabled={this.state.loading}>
										Reject Request
									</Button>
									<Button className='btn-action' onClick={this.handleClose}>
										Cancel
									</Button>
								</Modal.Footer></div>;
			} else {
				modalHtml = <div>
								<Modal.Header closeButton>
								<Modal.Title>{this.state.title}</Modal.Title>
									<span className='modal-subtitle'>{this.state.altMessage}</span>
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
											<Button className='btn-action' disabled={this.state.loading} onClick={() => {this.acceptRequestRequest(Common.requestStatus.approved); }} >
											Save Request Status
											</Button>
										</Modal.Footer>
							</div>;
			}

				return (
				<div>
				<Modal show={this.state.show} onHide={this.handleClose}>
					{modalHtml}
				</Modal>
				</div>
				);
		}
	}

export default ActionModal;
