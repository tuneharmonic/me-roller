export default interface KeyValue<T> {
    key: string;
    value: T;
}

export function KeyValueAdapter(keyValue: KeyValue<any>): KeyValue<any> {
    return keyValue;
}