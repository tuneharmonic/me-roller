import React from 'react';
import NumberInput from './NumberInput';
import DropdownInput from './DropdownInput';
import TextInput from './TextInput';
import Character from '../models/Character';
import CoverType from '../models/CoverType';
import { KeyValueAdapter } from '../models/KeyValue';
import './CharacterInput.css';

function CharacterInput(props: { character: Character, onChange(character: Character): void }) {

    function handleName(name: string) {
        props.onChange({ ...props.character, name });
    }

    function handleArmorClass(armorClass: number) {
        props.onChange({ ...props.character, armorClass });
    }

    function handleCoverStatus(coverStatus: string) {
        props.onChange({ ...props.character, coverStatus: Number.parseInt(coverStatus) });
    }

    return (
        <div className='CharacterInput'>
            <p className='title'>Character Input</p>
            <TextInput name='character-name' label='Name' value={props.character.name || ''} onChange={handleName} />
            <NumberInput name='armorClass' label='Armor Class' value={props.character.armorClass || 0} onChange={handleArmorClass} />
            <DropdownInput name='coverStatus' label='Cover Status' value={props.character.coverStatus || 0} valueType={CoverType} adapter={KeyValueAdapter} onChange={handleCoverStatus} />
        </div>
    );
}

export default CharacterInput;