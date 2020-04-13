import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastSuccess } from '../../components/Alert/Toast';
import Common from '../../constant/common';
import { apiReq, validateRef } from '../../helpers';

interface ChangePasswordState {
    loading: boolean;
    show: boolean;
}

class ChangePassword extends React.Component<{}, ChangePasswordState> {
		constructor(props: {}) {
		super(props);
		this.state = {
            loading: false,
            show: false
        };
		}

		handleClose = (): void => this.setState({show: false});

		changePassword = (): void => {
			this.setState({show: true});
		}

        submitChangePassword = () => {
			this.setState({loading: true});
			apiReq.changePassword({}).then(response => {
				this.setState({loading: false});
				if (response.status === Common.status.processed) {
					ToastSuccess({msg: response.data.detail});
					this.handleClose();
				} else {
					validateRef.displayErrorMessage(response);
				}
			}).catch(err => {
				try {
                    this.setState({loading: false});
					validateRef.displayErrorMessage(err.response);
				} catch (err) {}
			});
        }

		render() {
				return (
				<div>
				<Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
								<Modal.Title>Change Password</Modal.Title>
								<span className='modal-subtitle'></span>
								</Modal.Header>
								<Modal.Body>
									<form>
									</form>
									</Modal.Body>
								<Modal.Footer>
									<Button className='btn-outline' disabled={this.state.loading}>
										Change Password
									</Button>
								</Modal.Footer>
				</Modal>
				</div>
				);
		}
	}

export default ChangePassword;
