import { TKey } from 'types/Key';

/**
 * Интерфейс для выбора данных(опция) в выпадающем списке
 */
export interface ISelectOption
{
  /**
   * Значение
   */
  value: TKey;

  /**
   * Текст
   */
  text: string;

  /**
   * Путь к изображению
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}