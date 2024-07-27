import { IValidationResult } from 'modules/validation';

/**
 * Интерфейс для описания редактируемого свойства
 */
export interface IPropertyEditable
{
  /**
   * Статус включенности редактирования
   */
  enabled?: boolean;

  /**
   * Статус обязательного свойства
   */
  required: boolean;

  /**
   * Тип элемента редактирования свойства
   */
  editorType?: 'number' | 'text' | 'select' | 'multi-select';

  /**
   * Валидации свойства
   * @param value Значения свойства
   * @returns Статус валидации
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValidation: (value: any) => IValidationResult;
}