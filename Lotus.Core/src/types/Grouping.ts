import { TKey } from './Key';

/**
 * Интерфейс для группирования объектов
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IGrouping<TItem = any>
{
  /**
   * Ключ для группирования
   */
  groupKey: TKey;

  /**
   * Массив элементов
   */
  items: TItem[];
}


/**
 * Проверка объекта на поддержку интерфейса IGrouping
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfGrouping(value: any): value is IGrouping 
{
  if (value)
  {
    return ('groupKey' in value) && ('items' in value) && (Array.isArray(value['items']));
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IGrouping 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfGrouping(value: any): IGrouping | undefined
{
  if (checkOfGrouping(value))
  {
    return value as IGrouping;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}
