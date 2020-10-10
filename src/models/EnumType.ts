export class KeyValue<T> {
    constructor(key: string, value: T){
        this.key = key;
        this.value = value;
    }

    public key: string;
    public value: T;
}

export class EnumType<T> extends Array<KeyValue<T>> {
    getValue(key: string): T | undefined {
        return this.find(keyValue => keyValue.key === key)?.value;
    }

    getKey(value: T): string | undefined {
        return this.find(keyValue => keyValue.value === value)?.key;
    }
}