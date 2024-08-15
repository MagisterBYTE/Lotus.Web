import { TKey } from './Key';
/**
 * Интерфейс для поддержки редактируемых объектов
 */
export interface IEditable {
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
export declare function checkOfEditable(value: any): value is IEditable;
/**
 * Преобразование объекта к интерфейсу IEditable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function instanceOfEditable(value: any): IEditable | undefined;
