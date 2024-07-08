import { IFilterFunctionDesc } from 'modules/filter/FilterFunction';
import { IPropertyDescriptor } from './PropertyDescriptor';

/**
 * Интерфейс для представления(описания) свойств объектов
 */
// @ts-expect-error no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IObjectInfo<TObject = unknown>
{
  /**
   * Получение списка свойств
   */
  getProperties():IPropertyDescriptor[];

  /**
   * Получение списка свойств поддерживающих сортировку
   */
  getPropertiesSorted():IPropertyDescriptor[];  

  /**
   * Получение свойства по имени
   * @param name Имя свойства 
   */
  getPropertyByName(name: string):IPropertyDescriptor;

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterFunctionsDesc():Record<string, IFilterFunctionDesc>
}

/**
 * Базовый класс для представления(описания) свойств объектов
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ObjectInfoBase<TObject = any> implements IObjectInfo<TObject>
{
  public descriptors: IPropertyDescriptor[] = [];

  constructor() 
  {
    this.getProperties = this.getProperties.bind(this);
    this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
    this.getPropertyByName = this.getPropertyByName.bind(this);
    this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);      
  }

  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertiesSorted():IPropertyDescriptor[]
  {
    return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
  }

  public getPropertyByName(name: string):IPropertyDescriptor
  {
    return this.descriptors.find(x => x.fieldName === name)!;
  }

  public getFilterFunctionsDesc():Record<string, IFilterFunctionDesc>
  {
    const filterFunctions:Record<string, IFilterFunctionDesc> = {};

    this.descriptors.forEach((x) => 
    {
      if(x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = x.filtering.functionDefault;
      }
    })

    return filterFunctions;
  }  
}