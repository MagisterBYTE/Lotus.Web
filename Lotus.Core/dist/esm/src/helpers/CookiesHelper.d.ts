export declare class CookiesHelper {
    /**
     * Возвращает куки с указанным name или undefined, если ничего не найдено
     * @param name Имя куки
     * @returns куки с указанным name или undefined, если ничего не найдено
     */
    static get(name: string): string | undefined;
    /**
     * Установка куки
     * @param name Имя
     * @param value Значение
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static set(name: string, value: string, encodeValue?: boolean, options?: {}): void;
    /**
     * Удаление куки
     * @param name Имя
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static delete(name: string, encodeValue?: boolean, options?: {}): void;
    /**
     * Удаление всех кук
     */
    static deleteAll(): void;
}
