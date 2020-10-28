import React, { useState } from 'react';
import AttackRollerProps, { AttackResult, AttackTypes, FireTypeToAttackTypeMap } from '../models/AttackRollerProps';
import KeyValue from '../models/KeyValue';
import Roll from '../utilities/Roll';
import DropdownInput from './DropdownInput';

function AttackRoller(props: AttackRollerProps) {

    const attackOptions = determineAttackOptions();
    const [state, setState] = useState({ message: '', currentRecoil: 0, attackType: attackOptions[0] });

    function determineAttackOptions(): number[] {
        return FireTypeToAttackTypeMap.get(props.weapon.fireType) || [0];
    }

    // function setMessage(message: string) {
    //     setState({ ...state, message });
    // }

    // function setCurrentRecoil(currentRecoil: number) {
    //     setState({ ...state, currentRecoil });
    // }

    function setAttackType(attackType: number) {
        setState({ ...state, attackType })
    }

    function calculateDamage(attackResult: number): number {
        const rawDamageRoll = props.weapon.damage.Calculate();
        switch (attackResult) {
            case AttackResult.Instant:
                // log
                return Number.POSITIVE_INFINITY;
            case AttackResult.Vorpal:
                // log
                return rawDamageRoll.result * props.weapon.critMultiplier * 2;
            case AttackResult.Critical:
                // log
                return rawDamageRoll.result * props.weapon.critMultiplier;
            case AttackResult.Hit:
                // log
                return rawDamageRoll.result;
            case AttackResult.Miss:
            default:
                // log
                return 0;
        }
    }

    // returns AttackResult
    function rollAttack(): number {
        const rawAttackRoll = Roll.Die();
        if (checkCritical(rawAttackRoll)) {
            const critConfirmRoll = Roll.Die();
            if (checkCritical(critConfirmRoll)) {
                const vorpalConfirmRoll = Roll.Die();
                if (checkCritical(vorpalConfirmRoll)) {
                    const instantRoll = Roll.Die();
                    if (checkCritical(instantRoll) || checkAttackRoll(instantRoll)) {
                        // instant incapacitation
                        return AttackResult.Instant;
                    }
                } else if (checkAttackRoll(vorpalConfirmRoll)) {
                    // vorpal attack
                    return AttackResult.Vorpal;
                } else {
                    // critical attack
                    return AttackResult.Critical;
                }
            } else if (checkAttackRoll(critConfirmRoll)) {
                // critical attack
                return AttackResult.Critical;
            } else {
                // normal attack
                return AttackResult.Hit;
            }
        } else if (checkAttackRoll(rawAttackRoll)) {
            // normal attack
            return AttackResult.Hit;
        }
        //miss...
        return AttackResult.Miss;
    }

    function checkCritical(roll: number): boolean {
        return roll >= props.weapon.critRange;
    }

    function checkAttackRoll(roll: number) {
        return roll + props.weapon.attackBonus - state.currentRecoil >= props.target.armorClass + props.target.coverStatus;
    }

    function adaptOptions(attackOption: number): KeyValue<number> {
        return { key: AttackTypes.Name[attackOption], value: attackOption }
    }

    function handleAttackType(typeString: string) {
        setAttackType(Number.parseInt(typeString));
    }
    
    return (
        <div className='AttackRoller'>
            <DropdownInput name='attackType' text='Attack Type' value={attackOptions[0]} valueType={attackOptions} adapter={adaptOptions} onChange={handleAttackType} />
        </div>
    );
}

export default AttackRoller;