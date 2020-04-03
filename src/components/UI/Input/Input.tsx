import React, { useRef, useState } from 'react';
interface MutableRefObject<T> {
				current: T;
}
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

		if (props.invalid && props.shouldValidate && props.touched) {
				errorMessage = <span className='field-error'>{props.validationMsg ? props.validationMsg : ''}</span>;
		}

		if (props.elementConfig.type === 'password') {
			showPassword = <span className='show-action' onClick={togglePassword}>{isHide ? 'Show' : 'Hide'}</span>;
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
			<div className='form-group'>
				<div className='field-group'>
				{inputElement}
				<label>{props.elementConfig.placeholder}</label>
				{showPassword}
				</div>
				{errorMessage}
			</div>
		);

};

export default Input;
