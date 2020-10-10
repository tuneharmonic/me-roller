import React from 'react';
import Weapon from '../models/Weapon';
import WeaponType from '../models/WeaponType';
import FireType from '../models/FireType';
import NumberInput from './NumberInput';
import DropdownInput from './DropdownInput';

function WeaponInput(props: {weapon: Weapon}) {

    // get this from parent
    props.weapon = new Weapon(
    'M8 Avenger',
    'Standard issue alliance military assault rifle. Has quickly become a widely adopted defense platform across the galaxy.',
    WeaponType.getValue('ARifle') || '',
    [4],
    0,
    0,
    20,
    2,
    4,
    FireType.getValue('Auto') || '',
    2);

    function handleWeaponType(weaponType: string) {
        props.weapon.weaponType = weaponType;
    }

    function handleDamageBonus(damageBonus: number) {
        props.weapon.damageBonus = damageBonus;
    }
    
    function handleAttackBonus(attackBonus: number) {
        props.weapon.attackBonus = attackBonus;
    }
    
    function handleCritRange(attackBonus: number) {
        props.weapon.attackBonus = attackBonus;
    }
    
    function handleCritMultiplier(attackBonus: number) {
        props.weapon.attackBonus = attackBonus;
    }
    
    function handleRateOfFire(attackBonus: number) {
        props.weapon.attackBonus = attackBonus;
    }

    function handleFireType(fireType: string) {
        props.weapon.fireType = fireType;
    }
    
    function handleRecoil(attackBonus: number) {
        props.weapon.attackBonus = attackBonus;
    }

    return (
        <div className='WeaponInput'>
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