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
	text: string;
	currentStatus: string;
	reject_reason: string;
}

interface RequestData {
	status: number;
	text?: string;
}

interface OtherOptions {
	submitSearch: Function | null;
	onPageClick: Function | null;
	totalCount: number;
	page: number;
}

class ActionModal extends React.Component<{}, ActionState> {
		private rejected = `${Common.requestStatus.rejected}`;
		private approved = `${Common.requestStatus.approved}`;
		private otherOptions: OtherOptions = {
			submitSearch: null,
			onPageClick: null,
			page: Common.one,
			totalCount: Common.zero
		};
		constructor(props: {}) {
		super(props);
		this.state = {
			show: false,
			title: '',
			altMessage: '',
			requestAction: '',
			data: {},
			loading: false,
			text: '',
			currentStatus: this.rejected,
			reject_reason: ''
			};
			this.textChange = this.textChange.bind(this);
			this.onStatusChanged = this.onStatusChanged.bind(this);
		}

		textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			this.setState({text: e.target.value});
		}

		onStatusChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({currentStatus: e.target.value});
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (data: UserData, requestAction: string, otherOptions: OtherOptions): void => {
			this.otherOptions = otherOptions;
			this.setState({text: ''});
			this.setState({requestAction});
			this.setState({data});
			const reject_reason = (data.reject_reason && data.reject_reason.description) ? data.reject_reason.description : '';
			this.setState({reject_reason});
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
			const reqData: RequestData = {status};
			if (this.state.text) {
				reqData.text = this.state.text;
			}
			apiReq.changeStatus(this.state.data.id, reqData).then(response => {
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					this.refreshPageData(status);
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
				try {
					this.setState({loading: false});
					let msg = err.response.data.detail;
					if (!msg)  {
						msg = validateRef.getObjectFirstKeyValue(err.response.data.error);
					}
					ToastError({msg});
				  } catch (err) {}
			});
		}

		refreshPageData (status: number) {
			if (!this.otherOptions.submitSearch || !this.otherOptions.onPageClick) {
				return;
			}
			if (status === Common.requestStatus.rejected) {
				this.otherOptions.submitSearch();
			} else {
				const pageModulo =  this.otherOptions.totalCount % Common.pageLimit;
				if (pageModulo === Common.one) {
					this.otherOptions.onPageClick(this.otherOptions.page - Common.one);
				} else {
					this.otherOptions.submitSearch();
				}
			}
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
										<textarea maxLength={Common.rejectReasonLength} placeholder='Add Comment' className='reject-comment' onChange={this.textChange} ></textarea>
									</form>
									</Modal.Body>
								<Modal.Footer>
									<Button className='btn-outline' disabled={this.state.loading || !this.state.text} onClick={() => {this.acceptRequestRequest(Common.requestStatus.rejected); }} >
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
											<p>{this.state.reject_reason}</p>
											<div className=''>
											<p>Change Request Status</p>
											<div className='custom-radio request-radio'>
											<label className='radio-rejected'>
												<input checked={this.state.currentStatus === this.rejected} value={this.rejected} type='radio'
												 name='rejected' onChange={this.onStatusChanged}></input> Rejected
												<span></span>
											</label>
											<label className='radio-approve'>
												<input checked={this.state.currentStatus === this.approved} value={this.approved} type='radio'
												 name='approve' onChange={this.onStatusChanged}></input> Approve
												<span></span>
											</label>
											</div>
											</div>
											</Modal.Body>
										<Modal.Footer>
											<Button className='btn-outline'  onClick={this.handleClose}>
											Cancel
											</Button>
											<Button className='btn-action' disabled={this.state.loading || this.state.currentStatus === this.rejected}
											onClick={() => {this.acceptRequestRequest(Common.requestStatus.approved); }} >
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
