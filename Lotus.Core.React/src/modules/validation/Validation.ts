import { IValidationResult } from './ValidationResult';

/**
 * Интерфейс для определения валидации
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IValidation<TValue = any>
{
    validation: (value: TValue | null) => IValidationResult;
}