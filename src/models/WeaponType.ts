import EnumType from "./EnumType";

const WeaponType: EnumType<string> = new EnumType<string>(
    { key: "Pistol", value: "Pistol" },
    { key: "SMG", value: "SMG" },
    { key: "Assault Rifle", value: "ARifle" },
    { key: "Shotgun", value: "Shotgun" },
    { key: "Sniper Rifle", value: "Sniper" },
    { key: "Heavy Weapon", value: "Heavy" },
    { key: "Melee Weapon", value: "Melee" }
);

export default WeaponType;