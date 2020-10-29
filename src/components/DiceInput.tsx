import React, { ChangeEvent, FocusEvent, useState } from 'react';
import DiceExpression from '../models/DiceExpression';

function DiceInput(props: { name: string, label: string, value: DiceExpression | undefined, onChange(value: DiceExpression): void }) {

    const [errorMessage, setErrorMessage] = useState('');

    function handleError(error: Error) {
        setErrorMessage(error.message);
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>) {
        validateAndSet(props.value?.PrettyString() || '0');
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        validateAndSet(event.target.value);
    }

    function validateAndSet(expressionString: string) {
        const expression = DiceExpression.Parse(expressionString, handleError);
        if (expression !== undefined) {
            setErrorMessage('');
            props.onChange(expression);
        }
    }
    
    return (
        <div id={props.name + '-group'} className='DiceInput'>
            <label>
                {props.label}:
                <input id={props.name + '-input'} value={props.value?.toString()} type='text' onChange={handleChange} onBlur={handleBlur} />
            </label>
            { 
                errorMessage !== ''
                ? <p className="error">{errorMessage}</p>
                : null
            }
        </div>
    );
}

export default DiceInput;