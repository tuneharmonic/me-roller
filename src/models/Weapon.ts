import DiceExpression from "./DiceExpression";

export default interface Weapon {
    name: string;
    description: string;
    weaponType: string;
    damage: DiceExpression;
    attackBonus: number;
    critRange: number;
    critMultiplier: number;
    rateOfFire: number;
    fireType: string;
    recoil: number;
}