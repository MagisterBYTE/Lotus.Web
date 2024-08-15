import { IPropertyTypeDesc } from 'modules/objectInfo';
import { IFilterFunctionDesc } from 'modules/filter';
/**
 * Интерфейс для фильтрации по одному свойству
 */
export interface IFilterProperty {
    /**
     * Имя свойства по которому осуществляется фильтрация
     */
    propertyName: string;
    /**
     * Функция для фильтрации
     */
    function: IFilterFunctionDesc;
    /**
     * Тип свойства
     */
    propertyType: IPropertyTypeDesc;
    /**
     * Статус типа свойства - массив
     */
    isArray?: boolean;
    /**
    * Учитывать регистр при фильтрации строк
    */
    isSensitiveCase?: boolean;
    /**
     * Значение
     */
    value?: string;
    /**
     * Массив значений
     */
    values?: string[];
}
/**
 * Тип для фильтрации объектов
 */
export type IFilterObject = IFilterProperty[];
/**
 * Проверка на значение фильтра свойства
 * @param filterProperty Параметры фильтрации свойства
 */
export declare const hasFilterPropertyValue: (filterProperty: IFilterProperty) => boolean;
/**
 * Проверка на значение фильтров свойств
 * @param filterProperty Список параметров фильтрации свойства
 */
export declare const hasFilterPropertiesValue: (filterProperties: IFilterObject) => boolean;
