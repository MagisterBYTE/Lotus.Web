import { TCssWidth } from 'ui/types/CssTypes';

/**
 * Параметры боковой панели сайта
 */
export interface ILayoutSidePanel
{
  /**
   * Видна/Не видна
   */
  isVisible: boolean;

  /**
   * Открыта/Закрыта
   */
  isOpen: boolean;

  /**
   * Текущая ширина панели
   */
  width: TCssWidth;

  /**
  * Максимальная ширина панели в открытом состоянии
  */
  maxWidth: TCssWidth;

  /**
  * Минимальная ширина панели в закрытом состоянии
  */
  minWidth: TCssWidth;
}