import { IValidationResult, ValidationResultSuccess } from './ValidationResult';

/**
 * Интерфейс для определения правила валидации
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IValidationRule<TValue = any>
{
  validation: (value: TValue | null) => IValidationResult;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ValidationSuccess<TValue = any> implements IValidationRule<TValue>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validation(_: TValue | null): IValidationResult
  {
    return ValidationResultSuccess;
  }
}