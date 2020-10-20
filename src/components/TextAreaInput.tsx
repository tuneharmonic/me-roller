import React, { ChangeEvent } from 'react';

function TextAreaInput(props: { name: string, text: string, value: string, onChange(value: string): void }) {

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        props.onChange(event.target.value)
    }

    return (
        <div id={props.name + '-group'} className='TextAreaInput'>
            <label>
                {props.text}:
                <textarea id={props.name + '-input'} onChange={handleChange}>
                    {props.value}
                </textarea>
            </label>
        </div>
    );
}

export default TextAreaInput;