import { IGrouping } from 'types/Grouping';
export declare class ArrayHelper {
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static getNumberArrayFromTo(from: number, to: number): number[];
    /**
     * Проверка массива что он является строго числовым
     * @param array Проверяемый массив
     * @returns Статус проверки
     */
    static checkIsNumbers(array: any[]): array is number[];
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param source Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkInArrayAny<TItem>(source: TItem[], checked: TItem[]): boolean;
    /**
     * Группировка массива по указанному свойству
     * @param source Исходный массив
     * @param propertyName Имя свойства по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupByProperty<TItem>(source: TItem[], propertyName: string): IGrouping<TItem>[];
}
