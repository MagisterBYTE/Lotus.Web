/**
 * Интерфейс для поддержки константных объектов
 */
export interface IConstantable
{
  /**
   * Статус константного объекта
   */
  isConst?: boolean;
}

/**
 * Проверка объекта на поддержку интерфейса IConstantable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfConstantable(value: any): value is IConstantable
{
  if (value)
  {
    return ('isConst' in value) && value.isConst === true;
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IConstantable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfConstantable(value: any): IConstantable | undefined
{
  if (checkOfConstantable(value))
  {
    return value as IConstantable;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}