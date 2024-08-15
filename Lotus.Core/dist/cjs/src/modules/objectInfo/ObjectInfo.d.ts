import { IFilterFunctionDesc } from 'modules/filter/FilterFunction';
import { IPropertyDescriptor } from './PropertyDescriptor';
/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo<TObject = any> {
    /**
     * Получение списка свойств
     */
    getProperties(): IPropertyDescriptor[];
    /**
     * Получение списка свойств поддерживающих сортировку
     */
    getPropertiesSorted(): IPropertyDescriptor[];
    /**
     * Получение свойства по имени
     * @param name Имя свойства
     */
    getPropertyByName(name: string): IPropertyDescriptor;
    /**
     * Получение списка функций фильтрации для свойств
     */
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
}
/**
 * Базовый класс для представления(описания) свойств объектов
 */
export declare class ObjectInfoBase<TObject = any> implements IObjectInfo<TObject> {
    descriptors: IPropertyDescriptor[];
    constructor();
    getProperties(): IPropertyDescriptor[];
    getPropertiesSorted(): IPropertyDescriptor[];
    getPropertyByName(name: string): IPropertyDescriptor;
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
}
