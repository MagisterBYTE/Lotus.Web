/**
 * Перечисление для типа обратной связи
 */
export declare const FeedbackTypeEnum: {
    /**
     * Простое предупреждение без взаимодействия
     */
    readonly Alert: {
        readonly id: 0;
        readonly name: "Alert";
    };
    /**
     * Информирование с возможностью взаимодействия
     */
    readonly Snackbar: {
        readonly id: 1;
        readonly name: "Snackbar";
    };
    /**
     * Модальное окно
     */
    readonly Modal: {
        readonly id: 2;
        readonly name: "Modal";
    };
    /**
     * Информирование с прогрессом
     */
    readonly Progress: {
        readonly id: 3;
        readonly name: "Progress";
    };
};
/**
 * Тип обратной связи
 */
export type TFeedbackType = keyof typeof FeedbackTypeEnum;
