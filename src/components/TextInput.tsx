import React, { ChangeEvent } from 'react';

function TextInput(props: { name: string, text: string, value: string, onChange: Function }) {

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        props.onChange(event.target.value);
    }
    
    return (
        <div id={props.name + '-group'} className='NumberInput'>
            <label>
                {props.text}:
                <input id={props.name + '-input'} value={props.value} type='text' onChange={handleChange} />
            </label>
        </div>
    );
}

export default TextInput;