export interface KeyValue<T> {
    key: string;
    value: T;
}

export default class EnumType<T> extends Array<KeyValue<T>> {

    private defaultValue: KeyValue<T>;

    constructor(defaultValue: KeyValue<T>, ...params: Array<KeyValue<T>>) {
        super(defaultValue, ...params);
        this.defaultValue = defaultValue;
    }

    getValue(key: string): T {
        const entry = this.find(keyValue => keyValue.key === key) || this.defaultValue;
        return entry.value;
    }

    getKey(value: T): string {
        const entry = this.find(keyValue => keyValue.value === value) || this.defaultValue;
        return entry.key;
    }
}