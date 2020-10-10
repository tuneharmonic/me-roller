import React, { ChangeEvent } from 'react';
import { EnumType } from '../models/EnumType';

function DropdownInput(props: { name: string, text: string, value: any, valueType: EnumType<any>, onChange: Function }) {

    function renderOption(optionValue: any, text: string) {
        return <option value={optionValue.toString()}>{text}</option>;
    }

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onChange(event.target.value);
    }

    return (
        <div id={props.name + '-group'} className='DropdownInput'>
            <label>
                {props.text}:
                <select id={props.name + '-input'} value={props.value.toString()} onChange={handleChange}>
                    { props.valueType.map(k => renderOption(k.value, k.key)) }
                </select>
            </label>
        </div>
    );
}

export default DropdownInput;