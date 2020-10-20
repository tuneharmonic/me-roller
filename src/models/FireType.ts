import EnumType from "./EnumType";

const FireType: EnumType<string> = new EnumType<string>(
    { key: "Single Shot", value: "SingleShot" },
    { key: "Semi-Automatic", value: "SemiAuto" },
    { key: "Burst Fire", value: "Burst" },
    { key: "Automatic", value: "Auto" },
    { key: "Melee", value: "Melee" }
);

export default FireType;