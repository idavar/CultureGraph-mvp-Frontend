import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastSuccess } from '../../../components/Alert/Toast';
import { UserData } from '../../../interface/UserData';
import { PageRefresh } from '../../../interface/PageRefresh';
import Common from '../../../constant/common';
import { apiReq, validateRef } from '../../../helpers';

interface ActiveBlockState {
	show: boolean;
	title: string;
	altMessage: string;
	is_active?: boolean;
	id?: number;
    loading: boolean;
}

class ActiveBlock extends React.Component<{}, ActiveBlockState> {
		private pageRefresh: PageRefresh = {
			submitSearch: null,
			page: Common.one,
			totalCount: Common.zero
		};
		constructor(props: {}) {
		super(props);
		this.state = {
				show: false,
				title: '',
				altMessage: '',
				loading: false
			};
		}

		handleClose = (): void => this.setState({show: false});

		openModal = (data: UserData, pageRefresh: PageRefresh): void => {
			this.pageRefresh = pageRefresh;
			this.setState({is_active: data.is_active});
			this.setState({id: data.id});
			this.setState({title: Common.userStatusTitle.active});
			this.setState({altMessage: Common.userStatus.active});
			if (data.is_active) {
				this.setState({title: Common.userStatusTitle.block});
				this.setState({altMessage: Common.userStatus.block});
			}
            this.setState({show: true});
        }

		onActiveBlock = () => {
			if (!this.state.id) {
				return;
			}
			this.setState({loading: true});
			const reqData = {is_active: !this.state.is_active};
			apiReq.changeStatus(this.state.id, reqData).then(resData => {
				this.setState({loading: false});
				if (resData.status === Common.status.processed) {
					this.reloadPageData();
					ToastSuccess({msg: resData.data.detail});
					this.handleClose();
				} else {
					validateRef.displayErrorMessage(resData);
				}
			}).catch(err => {
				try {
					this.setState({loading: false});
					validateRef.displayErrorMessage(err.response);
				} catch (err) {}
			});
		}

        reloadPageData = () => {
			if (this.pageRefresh.submitSearch) {
				this.pageRefresh.submitSearch();
			}
		}

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
								<Button className='btn-outline' onClick={() => { this.onActiveBlock(); }} disabled={this.state.loading}>
									Yes
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
