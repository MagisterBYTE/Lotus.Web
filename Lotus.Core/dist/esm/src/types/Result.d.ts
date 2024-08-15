/**
 * Определение интерфейса для представления ответа/результата выполнения операции
 */
export interface IResult<TData = any> {
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
export declare function checkOfResult(value: any): value is IResult;
/**
 * Преобразование объекта к интерфейсу IResult
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function instanceOfResult(value: any): IResult | undefined;
