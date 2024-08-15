import { ISelectOption } from 'modules/selectOption/SelectOption';
import { IPropertyEditable } from './PropertyEditable';
import { IPropertyFiltering } from './PropertyFiltering';
import { IPropertyGrouping } from './PropertyGrouping';
import { IPropertySorting } from './PropertySorting';
import { IPropertyTypeDesc } from './PropertyType';
/**
 * Интерфейс для описания свойства объекта
 */
export interface IPropertyDescriptor {
    /**
     * Имя свойства
     */
    fieldName: string;
    /**
     * Наименования свойства
     */
    name: string;
    /**
     * Описание свойства (в виде подсказки)
     */
    desc?: string;
    /**
     * Тип свойства
     */
    propertyType: IPropertyTypeDesc;
    /**
     * Типа свойства - массив
     */
    isArray?: boolean;
    /**
     * Опции возможных значений свойства
     */
    options?: ISelectOption[];
    /**
     * Статус поддержки сортировки по свойству
     */
    sorting?: IPropertySorting;
    /**
     * Статус поддержки фильтрации по свойству
     */
    filtering?: IPropertyFiltering;
    /**
     * Статус поддержки группировки по свойству
     */
    grouping?: IPropertyGrouping;
    /**
     * Статус поддержки редактирования свойства
     */
    editing?: IPropertyEditable;
    /**
     * Отображение указанного свойства как изображения
     */
    viewImage?: boolean;
}
