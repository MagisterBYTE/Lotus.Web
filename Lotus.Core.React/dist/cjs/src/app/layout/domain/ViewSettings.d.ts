import { TCssHeight, TCssWidth } from 'ui/types/CssTypes';
/**
 * Визуальные настройки для каждого размера и ориентации устройства
 */
export interface IViewSettings {
    /**
     * Высота заголовка/шапка сайта
     */
    headerHeight: TCssHeight;
    /**
    * Максимальная ширина левой панели
    */
    leftPanelWidthMax: TCssWidth;
    /**
    * Минимальная ширина левой панели
    */
    leftPanelWidthMin: TCssWidth;
    /**
    * Максимальная ширина правой панели
    */
    rightPanelWidthMax: TCssWidth;
    /**
    * Минимальная ширина правой панели
    */
    rightPanelWidthMin: TCssWidth;
    /**
     * Высота футера/подвал сайта
     */
    footerHeight: TCssHeight;
}
