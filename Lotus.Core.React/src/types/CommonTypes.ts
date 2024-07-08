export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ReplaceValues<T, V> = { [K in keyof T]: V };

export type PropertyType<TType, TPropertyName extends keyof TType> = TType[TPropertyName];

export type Dictionary<TKey extends string | symbol | number, TValue> = {
    [key in TKey]: TValue
}
