import AttackRollerProps, { AttackTypeGroup } from "./AttackRollerProps";
import Character from "./Character";
import Weapon from "./Weapon";

export default interface AppState {
    character: Character;
    weapon: Weapon;
    attackTypeGroup: AttackTypeGroup;
} 