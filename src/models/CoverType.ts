import { EnumType, KeyValue } from "./EnumType";

const CoverType: EnumType<number> = new EnumType<number>(
    new KeyValue("Open", 0),
    new KeyValue("Quarter", 2),
    new KeyValue("Half", 4),
    new KeyValue("Three Quarters", 7),
    new KeyValue("Massive", 10),
    new KeyValue("Total", 999)
);

export default CoverType;