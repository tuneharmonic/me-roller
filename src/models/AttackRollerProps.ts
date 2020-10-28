import Character from "./Character";
import Weapon from "./Weapon";

export default interface AttackRollerProps {
    weapon: Weapon;
    target: Character;
    attackOptions: number[];    // AttackTypes
}

export interface AttackRollerState {
    messages: string[];
    attackType: number;         // AttackTypes
}

export const AttackResult = {
    Failure: 0,
    Miss: 1,
    Hit: 2,
    Critical: 3,
    Vorpal: 4,
    Instant: 5
}

export const AttackTypes = {
    SingleShot: 0,
    DoubleTap: 1,
    Burst: 2,
    AutoFire: 3,
    FullAuto: 4,
    Name: [
        'Single Shot',
        'Double Tap',
        'Burst',
        'Auto Fire',
        'Full Auto'
    ]
}

export const FireTypeToAttackTypeMap = new Map<string, number[]>([
    ['SingleShot', [0]],
    ['SemiAuto', [0,1]],
    ['Burst', [2]],
    ['Auto', [0, 1, 3, 4]],
    ['Melee', [0]]
]);