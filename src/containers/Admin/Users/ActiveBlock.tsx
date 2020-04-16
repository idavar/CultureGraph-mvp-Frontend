
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UserData } from '../../../interface/UserData';
import Common from '../../../constant/common';

interface ActiveBlockState {
	show: boolean;
	title: string;
    altMessage: string;
    loading: boolean;
}

class ActiveBlock extends React.Component<{}, ActiveBlockState> {
		constructor(props: {}) {
		super(props);
		this.state = {
            show: false,
            title: '',
            altMessage: '',
            loading: false,
			};
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (data: UserData): void => {
            this.setState({show: true});
        }

		onActiveBlock = (status: number) => {};

        refreshPageData = (status: number) => {};

		render() {
				return (
				<div>
				<Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
							<Modal.Title>{this.state.title}</Modal.Title>
							<span className='modal-subtitle'>{this.state.altMessage}</span>
							</Modal.Header>
							<Modal.Body></Modal.Body>
							<Modal.Footer>
								<Button className='btn-outline' onClick={() => {this.onActiveBlock(Common.requestStatus.approved); }} disabled={this.state.loading}>
									Accept Request
								</Button>
								<Button className='btn-action' onClick={this.handleClose}>
									Cancel
								</Button>
							</Modal.Footer>
				</Modal>
				</div>
				);
		}
	}

export default ActiveBlock;
