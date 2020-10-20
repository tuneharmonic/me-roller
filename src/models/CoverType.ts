import EnumType from "./EnumType";

const CoverType: EnumType<number> = new EnumType<number>(
    { key: "Open", value: 0 },
    { key: "Quarter", value: 2 },
    { key: "Half", value: 4 },
    { key: "Three Quarters", value: 7 },
    { key: "Massive", value: 10 },
    { key: "Total", value: 999 }
);

export default CoverType;