import { TKey } from 'types/Key';
import { ISelectOption } from './SelectOption';
export declare class SelectOptionHelper {
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options: ISelectOption[]): ISelectOption[];
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options: ISelectOption[]): ISelectOption[];
    /**
     * Получение корректного значения по умолчанию или начального значения
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultValue<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): TValueOption;
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultText<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): string;
    /**
     * Получение корректной иконки по умолчанию или начальной иконки
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultIcon<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): any;
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValues Начальное значение
     * @returns Массив текста выбранных значений
     */
    static getDefaultTexts<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValues?: TValueOption[]): string[];
    /**
     * Получение опций из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getSelectOptionByValue(options: ISelectOption[], selectedValue?: TKey): ISelectOption;
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getTextByValue(options: ISelectOption[], selectedValue?: TKey): string;
    /**
     * Получение иконки из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    static getIconByValue(options: ISelectOption[], selectedValue?: TKey): any;
    /**
     * Получение массива опций из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив опций
     */
    static getSelectOptionsByValues(options: ISelectOption[], selectedValues?: TKey[]): ISelectOption[];
    /**
     * Получение массива текста из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getTextsByValues(options: ISelectOption[], selectedValues?: TKey[]): string[];
    /**
     * Получение массива текста из неопределённого значения(свойства объекта)
     * @param options Массив всех опций
     * @param item Неопределённое значение
     * @returns Массив текста выбранных значений
     */
    static getTextsByUnknownValues(options: ISelectOption[], item: any): string[];
}
