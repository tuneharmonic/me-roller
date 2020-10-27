import React, { ChangeEvent } from 'react';
import DiceExpression from '../models/DiceExpression';

function DiceInput(props: { name: string, text: string, value: DiceExpression, onChange(value: DiceExpression): void }) {

    let errorMessage: string | null = null;

    function handleError(error: Error) {
        errorMessage = error.message;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const expression = DiceExpression.Parse(event.target.value, handleError);
        if (expression !== undefined) {
            props.onChange(expression);
        }
    }
    
    return (
        <div id={props.name + '-group'} className='DiceInput'>
            <label>
                {props.text}:
                <input id={props.name + '-input'} value={props.value.toString()} type='text' onChange={handleChange} />
            </label>
            { 
                errorMessage !== null
                ? <p className="error">{errorMessage}</p>
                : null
            }
        </div>
    );
}

export default DiceInput;