import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Common from '../../constant/common';

export const SuccessError = (props: {msg: string, variant: 'danger' | 'success'}) => {
		const [visible, showHide] = useState(true);
		forShowHide(showHide);
	return (<Alert  variant={props.variant} show={visible}>{props.msg}</Alert>);
};


const forShowHide = (showHide: Function) => {
		setTimeout(() => {
				showHide(false);
		}, Common.alertTimeout);
};
