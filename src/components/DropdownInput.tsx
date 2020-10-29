import React, { ChangeEvent } from 'react';
import KeyValue from '../models/KeyValue';

function DropdownInput(
    props: {
        name: string,
        label: string,
        value: any,
        valueType: Array<any>,
        adapter(sourceType: any): KeyValue<any>,
        onChange(value: string): void
    }) {

    function renderOption(optionValue: any, text: string) {
        return <option key={optionValue.toString()} value={optionValue.toString()}>{text}</option>;
    }

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onChange(event.target.value);
    }

    return (
        <div id={props.name + '-group'} className='DropdownInput'>
            <label>
                {props.label}:
                <select id={props.name + '-input'} value={props.value.toString()} onChange={handleChange}>
                    { 
                        props.valueType.map(k => {
                            const keyValue = props.adapter(k);
                            return renderOption(keyValue.value, keyValue.key);
                        })
                    }
                </select>
            </label>
        </div>
    );
}

export default DropdownInput;