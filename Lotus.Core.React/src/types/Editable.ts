import { TKey } from './Key';

/**
 * Интерфейс для поддержки редактируемых объектов
 */
export interface IEditable
{
  /**
   * Идентификатор объекта
   */
  id: TKey;
}

/**
 * Проверка объекта на поддержку интерфейса IEditable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export const checkOfEditable = (value: object): boolean =>
{
  if (value)
  {
    return ('id' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IEditable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export const instanceOfEditable = (value: object): IEditable | undefined =>
{
  if (checkOfEditable(value))
  {
    return value as IEditable;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}