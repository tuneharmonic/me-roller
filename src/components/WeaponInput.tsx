import React from 'react';
import Weapon from '../models/Weapon';
import WeaponType from '../models/WeaponType';
import FireType from '../models/FireType';
import NumberInput from './NumberInput';
import DropdownInput from './DropdownInput';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';

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

    function handleDamageBonus(damageBonus: number) {
        props.onChange({ ...props.weapon, damageBonus });
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
            <TextInput name='name' text='Name' value={props.weapon.name} onChange={handleName} />
            <TextAreaInput name='description' text='Description' value={props.weapon.description} onChange={handleDescription} />
            <DropdownInput name='weaponType' text='Weapon Type' value={props.weapon.weaponType} valueType={WeaponType} onChange={handleWeaponType} />
            <NumberInput name='damageBonus' text='Damage Bonus' value={props.weapon.damageBonus} onChange={handleDamageBonus} />
            <NumberInput name='attackBonus' text='Attack Bonus' value={props.weapon.attackBonus} onChange={handleAttackBonus} />
            <NumberInput name='critRange' text='Critical Range' value={props.weapon.critRange} onChange={handleCritRange} positiveOnly />
            <NumberInput name='critMultiplier' text='Critical Multiplier' value={props.weapon.critMultiplier} onChange={handleCritMultiplier} positiveOnly />
            <NumberInput name='rateOfFire' text='Rate of Fire' value={props.weapon.rateOfFire} onChange={handleRateOfFire} positiveOnly />
            <DropdownInput name='fireType' text='Mode of Fire' value={props.weapon.fireType} valueType={FireType} onChange={handleFireType} />
            <NumberInput name='recoil' text='Recoil Penalty' value={props.weapon.recoil} onChange={handleRecoil} positiveOnly />
        </div>
    );
}

export default WeaponInput;