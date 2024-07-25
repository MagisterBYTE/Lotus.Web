/**
 * Определение интерфейса для представления ответа/результата выполнения операции
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResult<TData = any>
{
  /**
   * Статус успешности выполнения метода
   */
  succeeded: boolean;

  /**
   * Код
   */
  code: number;

  /**
   * Сообщение о результате выполнения операции
   */
  message?: string;

  /**
   * Дополнительные данные
   */
  data?: TData;
}

/**
 * Проверка объекта на поддержку интерфейса IResult
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */

export function checkOfResult(value: object): boolean
{
  if (value)
  {
    return ('succeeded' in value) && ('code' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IResult 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function instanceOfResult(value: object): IResult | undefined
{
  if (checkOfResult(value))
  {
    return value as IResult;
  }
  else
  {
    // eslint-disable-next-line consistent-return
    return undefined;
  }
}