/**
 * Перечисление для типа простого информирования
 */
export declare const AlertTypeEnum: {
    /**
     * Ошибка
     */
    readonly Error: {
        readonly id: 0;
        readonly name: "Error";
    };
    /**
     * Предупреждение
     */
    readonly Warning: {
        readonly id: 1;
        readonly name: "Warning";
    };
    /**
     * Простая информация
     */
    readonly Info: {
        readonly id: 2;
        readonly name: "Info";
    };
    /**
     * Простая информация со статусом успешно
     */
    readonly Success: {
        readonly id: 3;
        readonly name: "Success";
    };
};
/**
 * Тип простого информирования
 */
export type TAlertType = keyof typeof AlertTypeEnum;
