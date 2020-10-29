import React from 'react';
import Weapon from '../models/Weapon';
import WeaponType from '../models/WeaponType';
import FireType from '../models/FireType';
import NumberInput from './NumberInput';
import DropdownInput from './DropdownInput';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import DiceExpression from '../models/DiceExpression';
import DiceInput from './DiceInput';
import { KeyValueAdapter } from '../models/KeyValue';
import './WeaponInput.css';

function WeaponInput(props: { weapon: Weapon, onChange(weapon: Weapon): void }) {

    function handleName(name: string) {
        props.onChange({ ...props.weapon, name });
    }

    function handleDescription(description: string) {
        props.onChange({ ...props.weapon, description });
    }
    
    function handleWeaponType(weaponType: string) {
        props.onChange({ ...props.weapon, weaponType });
    }

    function handleDamage(damage: DiceExpression) {
        props.onChange({ ...props.weapon, damage });
    }
    
    function handleAttackBonus(attackBonus: number) {
        props.onChange({ ...props.weapon, attackBonus });
    }
    
    function handleCritRange(critRange: number) {
        props.onChange({ ...props.weapon, critRange });
    }
    
    function handleCritMultiplier(critMultiplier: number) {
        props.onChange({ ...props.weapon, critMultiplier });
    }
    
    function handleRateOfFire(rateOfFire: number) {
        props.onChange({ ...props.weapon, rateOfFire });
    }

    function handleFireType(fireType: string) {
        props.onChange({ ...props.weapon, fireType });
    }
    
    function handleRecoil(recoil: number) {
        props.onChange({ ...props.weapon, recoil });
    }

    return (
        <div className='WeaponInput'>
            <p className='title'>Weapon Input</p>
            <TextInput name='weapon-name' label='Name' value={props.weapon.name} onChange={handleName} />
            <TextAreaInput name='description' label='Description' value={props.weapon.description} onChange={handleDescription} />
            <DropdownInput name='weaponType' label='Weapon Type' value={props.weapon.weaponType} valueType={WeaponType} adapter={KeyValueAdapter} onChange={handleWeaponType} />
            <DiceInput name='damage' label='Damage' value={props.weapon.damage} onChange={handleDamage} />
            <NumberInput name='attackBonus' label='Attack Bonus' value={props.weapon.attackBonus} onChange={handleAttackBonus} />
            <NumberInput name='critRange' label='Critical Range' value={props.weapon.critRange} onChange={handleCritRange} positiveOnly />
            <NumberInput name='critMultiplier' label='Critical Multiplier' value={props.weapon.critMultiplier} onChange={handleCritMultiplier} positiveOnly />
            <NumberInput name='rateOfFire' label='Rate of Fire' value={props.weapon.rateOfFire} onChange={handleRateOfFire} positiveOnly />
            <DropdownInput name='fireType' label='Mode of Fire' value={props.weapon.fireType} valueType={FireType} adapter={KeyValueAdapter} onChange={handleFireType} />
            <NumberInput name='recoil' label='Recoil Penalty' value={props.weapon.recoil} onChange={handleRecoil} positiveOnly />
        </div>
    );
}

export default WeaponInput;