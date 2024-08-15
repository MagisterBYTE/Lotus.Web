import { IValidationResult } from './ValidationResult';
/**
 * Интерфейс для определения правила валидации
 */
export interface IValidationRule<TValue = any> {
    validation: (value: TValue | null) => IValidationResult;
}
export declare class ValidationSuccess<TValue = any> implements IValidationRule<TValue> {
    validation(_: TValue | null): IValidationResult;
}
