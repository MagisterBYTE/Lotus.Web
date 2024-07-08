/**
 * Интерфейс для определения статуса валидации
 */
export interface IValidationResult
{
    /**
     * Статус наличия ошибки валидации
     */
    error: boolean;

    /**
     * Текст ошибки
     */
    text?: string 
}

/**
 * Успешный результат валидации
 */
export const ValidationResultSuccess:IValidationResult = {error: false};