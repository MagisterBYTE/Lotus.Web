/**
 * Состояние элементов UI
 */
export enum TControlState
{
  /**
   * Обычное состояние
   */
  Normal = 'normal',

  /**
   * Состояние при наведении
   */
  Hover = 'hover',

  /**
   * Состояние при нажатии
   */
  Pressed = 'pressed',

  /**
   * Состояние в статусе выбора
   */
  Selected = 'selected',

  /**
   * Состояние в статусе фокуса
   */
  Focus = 'focus',

  /**
   * Состояние в недоступного элемента
   */
  Disabled = 'disabled',
};