import { EnumType, KeyValue } from "./EnumType";

const WeaponType: EnumType<string> = new EnumType<string>(
    new KeyValue("Pistol", "Pistol"),
    new KeyValue("SMG", "SMG"),
    new KeyValue("ARifle", "Assault Rifle"),
    new KeyValue("Shotgun", "Shotgun"),
    new KeyValue("Sniper", "Sniper Rifle"),
    new KeyValue("Heavy", "Heavy Weapon"),
    new KeyValue("Melee", "Melee Weapon")
);

export default WeaponType;