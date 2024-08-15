/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc {
    id: number;
    name: string;
    abbr: string;
    desc: string;
}
/**
 * Перечисление для типа функции для фильтрации данных
 */
export declare const FilterFunctionEnum: {
    /**
     * Равно аргументу
     */
    readonly Equals: {
        readonly id: 0;
        readonly name: "equals";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Не равно аргументу
     */
    readonly NotEqual: {
        readonly id: 1;
        readonly name: "notEquals";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Меньше аргумента
     */
    readonly LessThan: {
        readonly id: 2;
        readonly name: "lessThan";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Меньше или равно аргумента
     */
    readonly LessThanOrEqual: {
        readonly id: 3;
        readonly name: "lessThanOrEqualTo";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Больше аргумента
     */
    readonly GreaterThan: {
        readonly id: 4;
        readonly name: "greaterThan";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Больше или равно аргумента
     */
    readonly GreaterThanOrEqual: {
        readonly id: 5;
        readonly name: "greaterThanOrEqualTo";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    readonly Between: {
        readonly id: 6;
        readonly name: "between";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    readonly Contains: {
        readonly id: 7;
        readonly name: "contains";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    readonly StartsWith: {
        readonly id: 8;
        readonly name: "startsWith";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    readonly EndsWith: {
        readonly id: 9;
        readonly name: "endsWith";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    readonly NotEmpty: {
        readonly id: 10;
        readonly name: "notEmpty";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    readonly IncludeAny: {
        readonly id: 11;
        readonly name: "includeAny";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    readonly IncludeAll: {
        readonly id: 12;
        readonly name: "includeAll";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    readonly IncludeEquals: {
        readonly id: 13;
        readonly name: "includeEquals";
        readonly abbr: string;
        readonly desc: string;
    };
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    readonly IncludeNone: {
        readonly id: 14;
        readonly name: "includeNone";
        readonly abbr: string;
        readonly desc: string;
    };
};
/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;
