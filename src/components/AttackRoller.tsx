import React, { useState } from 'react';
import AttackRollerProps, { AttackResult, AttackTypes } from '../models/AttackRollerProps';
import KeyValue from '../models/KeyValue';
import Roll from '../utilities/Roll';
import DropdownInput from './DropdownInput';
import './AttackRoller.css';

function AttackRoller(props: AttackRollerProps) {

    let messageBuffer: string[] = [];
    let currentRecoil: number = 0;
    
    const [messages, setMessages] = useState<string[]>([]);

    function appendMessage(message: string) {
        messageBuffer.push(message);
    }

    function resetMessages() {
        setMessages([]);
        messageBuffer = [];
    }

    function pushMessages() {
        setMessages(messageBuffer);
        messageBuffer = [];
    }

    function incrementRecoil() {
        currentRecoil += props.weapon.recoil;
        console.log(currentRecoil);
        
    }

    function resetRecoil() {
        currentRecoil = 0;
    }

    function makeAttack() {
        resetMessages();

        let firstVolleyDamage;
        let secondVolleyDamage;
        let thirdVolleyDamage;
        switch (props.attackTypeGroup.attackType) {
            case AttackTypes.SingleShot:
                appendMessage('Rolling single-shot attack...');
                fireShot(1);
                break;
            case AttackTypes.DoubleTap:
                appendMessage('Rolling double-tap attack...');
                let firstShotDamage = fireShot(1);
                if (firstShotDamage === -1) {
                    appendMessage('First shot misfired. Skipping second shot.');
                    break;
                };
                incrementRecoil();
                let secondShotDamage = fireShot(2);
                if (secondShotDamage === -1) {
                    appendMessage('Second shot misfired. First shot did damage of: ' + firstShotDamage);
                    break;
                }; 
                appendMessage('Both shots do combined damage of: ' + firstShotDamage + ' + ' + secondShotDamage + ' = ' + (firstShotDamage + secondShotDamage));
                break;
            case AttackTypes.Burst:
                appendMessage('Rolling burst-fire attack...');
                fireBurst();
                break;
            case AttackTypes.AutoFire:
                appendMessage('Rolling auto-fire attack...');
                appendMessage('Firing first volley...');
                firstVolleyDamage = fireBurst();
                appendMessage('Firing second volley...');
                secondVolleyDamage = fireBurst();
                appendMessage('Both volleys do combined damage of: [' + firstVolleyDamage + ', ' + secondVolleyDamage + '] = ' + (firstVolleyDamage + secondVolleyDamage));
                break;
            case AttackTypes.FullAuto:
                appendMessage('Rolling full auto-fire attack...');
                appendMessage('Firing first volley...');
                firstVolleyDamage = fireBurst();
                appendMessage('Firing second volley...');
                secondVolleyDamage = fireBurst();
                appendMessage('Firing third volley...');
                thirdVolleyDamage = fireBurst();
                appendMessage('All volleys do combined damage of: [' + firstVolleyDamage + ', ' + secondVolleyDamage + ', ' + thirdVolleyDamage + '] = ' + (firstVolleyDamage + secondVolleyDamage + thirdVolleyDamage));
                break;
            default:
                break;
        }
        
        pushMessages();
        resetRecoil();
    }

    function fireBurst(): number {
        incrementRecoil();
        let damageString = '[';
        let totalDamage = 0;
        for (let shotNumber = 1; shotNumber <= props.weapon.rateOfFire; shotNumber++) {
            const damage = fireShot(shotNumber);
            if (damage === -1) {
                damageString += 'Misfire';
                break;
            };

            totalDamage += damage;
            damageString += damage;
            if (shotNumber !== props.weapon.rateOfFire && damage !== Number.POSITIVE_INFINITY) {
                damageString += ', ';
            }

            if (damage === Number.POSITIVE_INFINITY) break;
        }
        damageString += '] = ' + totalDamage;
        appendMessage('All shots do combined damage of: ' + damageString);
        return totalDamage;
    }

    function fireShot(shotNumber: number): number {
        appendMessage('Rolling shot #' + shotNumber + '...');
        let attackResult = rollAttack();
        if (attackResult !== AttackResult.Miss && attackResult !== AttackResult.Failure) {
            let attackDamage = calculateDamage(attackResult);
            logDamage(attackDamage, shotNumber);
            return attackDamage;
        } else if (attackResult === AttackResult.Miss) {
            return 0;
        }
        return -1;
    }

    function logDamage(damage: number, shotNumber: number) {
        appendMessage('Shot #' + shotNumber + ' dealt ' + damage + ' damage to ' + props.target.name + '!');
    }

    function calculateDamage(attackResult: number): number {
        const rawDamageRoll = props.weapon.damage.Calculate();
        switch (attackResult) {
            case AttackResult.Instant:
                appendMessage('Rolled damage: Infinity');
                return Number.POSITIVE_INFINITY;
            case AttackResult.Vorpal:
                const vorpalDamage = rawDamageRoll.result * props.weapon.critMultiplier * 2;
                appendMessage('Rolled damage: (' + rawDamageRoll.resolvedExpression + ') x ' + props.weapon.critMultiplier + ' x 2 = ' + vorpalDamage);
                return vorpalDamage;
            case AttackResult.Critical:
                const critDamage = rawDamageRoll.result * props.weapon.critMultiplier;
                appendMessage('Rolled damage: (' + rawDamageRoll.resolvedExpression + ') x ' + props.weapon.critMultiplier + ' = ' + critDamage);
                return critDamage;
            case AttackResult.Hit:
                appendMessage('Rolled damage: ' + rawDamageRoll.resolvedExpression);
                return rawDamageRoll.result;
            case AttackResult.Miss:
                return 0;
            case AttackResult.Failure:
            default:
                return -1;
        }
    }

    // returns AttackResult
    function rollAttack(): number {
        const rawAttackRoll = Roll.Die();
        if (rawAttackRoll === 1) {
            appendMessage('Rolled a natural 1. Critical failure...');
            return AttackResult.Failure;
        }

        if (checkCritical(rawAttackRoll)) {
            appendMessage('Rolled within critical range: ' + rawAttackRoll + '. Rolling to confirm...');
            const critConfirmRoll = Roll.Die();
            if (checkCritical(critConfirmRoll)) {
                appendMessage('Rolled within vorpal range: ' + critConfirmRoll + '. Rolling to confirm...');
                const vorpalConfirmRoll = Roll.Die();
                if (checkCritical(vorpalConfirmRoll)) {
                    appendMessage('Rolled within insta-gib range: ' + vorpalConfirmRoll + '. Rolling to confirm...');
                    const instantRoll = Roll.Die();
                    if (checkCritical(instantRoll)) {
                        // instant incapacitation - crit roll
                        appendMessage('Insta-gib confirmed!: ' + instantRoll);
                        return AttackResult.Instant;
                    } else if (checkAttackRoll(instantRoll)) {
                        // instant incapacitation - attack confirmed
                        appendMessage('Insta-gib confirmed!: ' +  getCalculatedAttackString(instantRoll));
                        return AttackResult.Instant;
                    }
                } else if (checkAttackRoll(vorpalConfirmRoll)) {
                    // vorpal attack
                    appendMessage('Vorpal attack confirmed!: ' + getCalculatedAttackString(vorpalConfirmRoll));
                    return AttackResult.Vorpal;
                } else {
                    // critical attack
                    appendMessage('Vorpal attack failed: ' + getCalculatedAttackString(vorpalConfirmRoll) + '. Critical attack confirmed!');
                    return AttackResult.Critical;
                }
            } else if (checkAttackRoll(critConfirmRoll)) {
                // critical attack
                    appendMessage('Critical attack confirmed!: ' + getCalculatedAttackString(critConfirmRoll));
                return AttackResult.Critical;
            } else {
                // normal attack
                    appendMessage('Critical attack failed: ' + getCalculatedAttackString(critConfirmRoll) + '. Normal hit confirmed!');
                return AttackResult.Hit;
            }
        } else if (checkAttackRoll(rawAttackRoll)) {
            // normal attack
            appendMessage('Normal hit confirmed!: ' + getCalculatedAttackString(rawAttackRoll));
            return AttackResult.Hit;
        }
        //miss...
        appendMessage('Attack missed: ' + getCalculatedAttackString(rawAttackRoll));
        return AttackResult.Miss;
    }

    function checkCritical(roll: number): boolean {
        return roll >= props.weapon.critRange;
    }

    function checkAttackRoll(roll: number) {
        return getCalculatedAttackRoll(roll) >= props.target.armorClass + props.target.coverStatus;
    }

    function getCalculatedAttackRoll(roll: number): number {
        return roll + props.weapon.attackBonus - currentRecoil;
    }

    function getCalculatedAttackString(roll: number) {
        return `[${roll} + ${props.weapon.attackBonus} - ${currentRecoil}] = ${getCalculatedAttackRoll(roll)}`;
    }

    function adaptOptions(attackOption: number): KeyValue<number> {
        return { key: AttackTypes.Name[attackOption], value: attackOption }
    }

    function setAttackType(attackType: number) {
        props.onChange({ ...props.attackTypeGroup, attackType });
    }

    function handleAttackType(typeString: string) {
        setAttackType(Number.parseInt(typeString));
    }
    
    return (
        <div className='AttackRoller'>
            <p className='title'>Attack Roller</p>
            <DropdownInput name='attackType' label='Attack Type' value={props.attackTypeGroup.attackType} valueType={props.attackTypeGroup.attackTypeOptions} adapter={adaptOptions} onChange={handleAttackType} />
            <button type="button" onClick={() => makeAttack()}>Make Attack</button>
            {
                messages.map((message, i) => {
                    return <p key={i}>{message}</p>
                })
            }
        </div>
    );
}

export default AttackRoller;