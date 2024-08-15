/**
 * Интерфейс для поддержки константных объектов
 */
export interface IConstantable {
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
export declare function checkOfConstantable(value: any): value is IConstantable;
/**
 * Преобразование объекта к интерфейсу IConstantable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function instanceOfConstantable(value: any): IConstantable | undefined;
