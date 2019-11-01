import React from 'react';
import './input.css';

const Input = (props) => {
    let inputElement = null;
    let invalid = false
    const inputClasses = [];
    inputClasses.push('inpt_login')
    if (props.invalid && props.shouldValidate && props.touched) {
        invalid = false
    }

    else {
        invalid = true
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={invalid ? 'inpt_login invalid' : 'inpt_login '}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={invalid ? 'inpt_login' : 'inpt_login invalid'}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        default:
            inputElement = <input className={invalid ? 'inpt_login' : 'inpt_login invalid'}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required
            />
    }

    return (
        <div className="input_div">
            {inputElement}
        </div>
    );
}

export default Input;