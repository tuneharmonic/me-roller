import { EnumType, KeyValue } from "./EnumType";

const FireType: EnumType<string> = new EnumType<string>(
    new KeyValue("SingleShot", "Single Shot"),
    new KeyValue("SemiAuto", "Semi-Automatic"),
    new KeyValue("Burst", "Burst Fire"),
    new KeyValue("Auto", "Automatic"),
    new KeyValue("Melee", "Melee")
);

export default FireType;