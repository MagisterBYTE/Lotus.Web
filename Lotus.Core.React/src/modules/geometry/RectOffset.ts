import { ISize } from './Size';

/**
 * Определение интерфейса для представления прямоугольника смещения
 */
export interface IRectOffset
{
  /**
   * Смещение слева
   */
  left: number;

  /**
   * Смещение сверху
   */
  top: number;

  /**
   * Смещение сверху
   */
  right: number;

  /**
   * Смещение снизу
   */
  bottom: number;
}

/**
 * Определение интерфейса для представления прямоугольника смещения и размеров
 */
export interface IRectSizeOffset extends IRectOffset, ISize
{

}