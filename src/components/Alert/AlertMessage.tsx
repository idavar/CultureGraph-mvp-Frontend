import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Common from '../../constant/common';

export const Success = (props: {msg: string}) => {
		const [visible, showHide] = useState(true);
		forShowHide(showHide);
	return (<Alert  variant='success' show={visible}>{props.msg}</Alert>);
};

export const Error = (props: {msg: string}) => {
		const [visible, showHide] = useState(true);
		forShowHide(showHide);
	return (<Alert variant='danger' show={visible}>{props.msg}</Alert>);
};

const forShowHide = (showHide: Function) => {
		setTimeout(() => {
				showHide(false);
		}, Common.alertTimeout);
};
