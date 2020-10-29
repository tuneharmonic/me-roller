import React, { ChangeEvent } from 'react';

function TextInput(props: { name: string, label: string, value: string, onChange(value: string): void }) {

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        props.onChange(event.target.value);
    }
    
    return (
        <div id={props.name + '-group'} className='TextInput'>
            <label>
                {props.label}:
                <input id={props.name + '-input'} value={props.value} type='text' onChange={handleChange} />
            </label>
        </div>
    );
}

export default TextInput;