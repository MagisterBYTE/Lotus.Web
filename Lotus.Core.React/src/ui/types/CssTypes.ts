import { Property } from 'csstype';

/**
 * Тип свойства - ширина Css
 */
export type TCssWidth = Property.Width<number | string>

/**
 * Тип свойства высота Css
 */
export type TCssHeight = Property.Height<number | string>

/**
 * Тип свойства размер шрифта Css
 */
export type TCssFontSize = Property.FontSize<number | string>