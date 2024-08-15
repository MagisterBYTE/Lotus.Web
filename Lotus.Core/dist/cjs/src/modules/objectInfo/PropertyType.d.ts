/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc {
    id: number;
    name: string;
}
/**
 * Перечисление для типа свойства
 */
export declare const PropertyTypeEnum: {
    /**
     * Логический тип
     */
    readonly Boolean: {
        readonly id: 0;
        readonly name: "Boolean";
    };
    /**
     * Целый тип
     */
    readonly Integer: {
        readonly id: 1;
        readonly name: "Integer";
    };
    /**
     * Вещественный тип
     */
    readonly Float: {
        readonly id: 2;
        readonly name: "Float";
    };
    /**
     * Строковый тип
     */
    readonly String: {
        readonly id: 3;
        readonly name: "String";
    };
    /**
     * Перечисление
     */
    readonly Enum: {
        readonly id: 4;
        readonly name: "Enum";
    };
    /**
     * Тип даты-времени
     */
    readonly DateTime: {
        readonly id: 5;
        readonly name: "DateTime";
    };
    /**
     * Глобальный идентификатор в формате UUID
     */
    readonly Guid: {
        readonly id: 6;
        readonly name: "Guid";
    };
    /**
     * Объект
     */
    readonly Object: {
        readonly id: 7;
        readonly name: "Object";
    };
};
/**
 * Тип свойства
 */
export type TPropertyType = keyof typeof PropertyTypeEnum;
