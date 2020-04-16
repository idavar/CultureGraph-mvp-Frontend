import React, { useRef, useState } from 'react';
interface MutableRefObject<T> {
				current: T;
}

const isDisplayError = (data: {invalid: boolean, shouldValidate: boolean, touched: boolean}) => data.invalid &&
data.shouldValidate && data.touched;

const getErrorMessage = (data: {validationMsg: string}) => <span className='field-error'>
	{data.validationMsg ? data.validationMsg : ''}</span>;

const Input = ( props: any ) => {
		const typeText = 'test';
		const typePassword = 'password';
		const inputEleRef: MutableRefObject<{type: string}> = useRef({type: typePassword});
		const [isHide, showHide] = useState(true);
		const togglePassword = () => {
			inputEleRef.current.type = !isHide ? typePassword : typeText;
			showHide(!isHide);
		};

		let inputElement = null;
		let errorMessage = null;
		let showPassword = null;
		let formGroupClass = 'form-group';

		if (isDisplayError(props)) {
				errorMessage = getErrorMessage(props);
				formGroupClass = `${formGroupClass} field-outline-error`;
		}

		if (props.elementConfig.type === 'password') {
			showPassword = <span className={props.value ? `show-action` : `ui-hide`} onClick={togglePassword}>{isHide ? 'Show' : 'Hide'}</span>;
		}

		switch ( props.elementType ) {
				case ( 'input' ):
						inputElement = <input
								{...props.elementConfig}
								className='form-control'
								value={props.value}
								onChange={props.changed}
								onBlur={props.onBlur}
								ref={inputEleRef} />;
						break;
				case ( 'textarea' ):
						inputElement = <textarea
								{...props.elementConfig}
								className='form-control'
								value={props.value}
								onChange={props.changed} />;
						break;
				case ( 'select' ):
						inputElement = (
								<select
										value={props.value}
										onChange={props.changed}>
										{props.elementConfig.options.map((option: {value: string | number, displayValue: string}) => (
												<option key={option.value} value={option.value}>
														{option.displayValue}
												</option>
										))}
								</select>
						);
						break;
				default:
						inputElement = <input
								{...props.elementConfig}
								value={props.value}
								onChange={props.changed} />;
		}

		return (
			<div className={formGroupClass} >
				<div className='field-group'>
					{/*<span className={`close-data ${hideElement}`} onClick={props.removeValidation}><img src='/assets/images/icon-close.png' alt='Close Icon' /></span>*/}
					{inputElement}
				<label>{props.elementConfig.label || props.elementConfig.placeholder}</label>
				{showPassword}
				</div>
				{errorMessage}
			</div>
		);

};

export default Input;
