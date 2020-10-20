import React, { ChangeEvent } from 'react';
import './NumberInput.css';

function NumberInput(props: { name: string, text: string, value: number, positiveOnly?: boolean, onChange(value: number): void }) {
    function validate(value: number): boolean {
        let valid = true;

        if (Number.isNaN(value)) {
            valid = false;
        }

        if (props.positiveOnly) {
            if (Math.sign(value) === -1) {
                valid = false;
            }
        }
        
        return valid;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const numberValue = event.target.valueAsNumber;
        if (validate(numberValue)) {
            props.onChange(numberValue);
        }
    }

    return (
        <div id={props.name + '-group'} className='NumberInput'>
            <label>
                {props.text}:
                <input id={props.name + '-input'} value={props.value} type='number' onChange={handleChange} />
            </label>
        </div>
    );
}

export default NumberInput;