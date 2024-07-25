import { IPropertyTypeDesc } from 'modules/objectInfo';
import { IFilterFunctionDesc } from 'modules/filter';

/**
 * Интерфейс для фильтрации по одному свойству
 */
export interface IFilterProperty
{
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
  isSensativeCase?: boolean;

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
export const hasFilterPropertyValue = (filterProperty: IFilterProperty): boolean =>
{
  if (!filterProperty.value && !filterProperty.values) return false;

  if (filterProperty.value && !filterProperty.values)
  {
    if (filterProperty.value === '')
    {
      return false;
    }
    return true;
  }

  if (!filterProperty.value && filterProperty.values)
  {
    if (filterProperty.values.length === 0)
    {
      return false;
    }
    return true;
  }

  return false;
}

/**
 * Проверка на значение фильтров свойств
 * @param filterProperty Список параметров фильтрации свойства
 */
export const hasFilterPropertiesValue = (filterProperties: IFilterObject): boolean =>
{
  let findValue = false;
  filterProperties.forEach(x =>
  {
    if (findValue === false)
    {
      findValue = hasFilterPropertyValue(x);
    }
  });

  return findValue;
}