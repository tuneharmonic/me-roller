import Character from "./Character";
import Weapon from "./Weapon";

export default interface AttackRollerProps {
    weapon: Weapon;
    target: Character;
}

export const AttackResult = {
    Miss: 0,
    Hit: 1,
    Critical: 2,
    Vorpal: 3,
    Instant: 4
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