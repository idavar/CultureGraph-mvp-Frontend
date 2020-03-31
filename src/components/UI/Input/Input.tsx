import React from 'react';

const input = ( props: any ) => {
		let inputElement = null;
		let errorMessage = null;

		if (props.invalid && props.shouldValidate && props.touched) {
				errorMessage = props.validationMsg ? <div>{props.validationMsg}</div> : '';
		}

		switch ( props.elementType ) {
				case ( 'input' ):
						inputElement = <input
								{...props.elementConfig}
								value={props.value}
								onChange={props.changed} />;
						break;
				case ( 'textarea' ):
						inputElement = <textarea
								{...props.elementConfig}
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
				<div className=''>
						<label className=''>{props.label}</label>
						{inputElement}
						{errorMessage}
				</div>
		);

};

export default input;
