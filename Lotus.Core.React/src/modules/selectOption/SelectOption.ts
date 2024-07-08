import { ReactNode } from 'react';
import { TKey } from 'types/Key';

/**
 * Интерфейс для выбора данных(опция) в выпадающем списке
 */
export interface ISelectOption
{
  /**
   * Значение
   */
  value:TKey;

  /**
   * Текст
   */
  text: string;

  /**
   * Путь к изображению
   */
  icon?: ReactNode;
}