import { TCssHeight } from 'ui/types/CssTypes';
/**
 * Параметры шапки сайта
 */
export interface ILayoutHeader {
    /**
     * Виден основной загловок/шапка сайта по настройкам пользователя
     */
    isVisibleUser: boolean;
    /**
     * Виден основной загловок/шапка сайта по логике макета
     */
    isVisible: boolean;
    /**
     * Высота загловка/шапка сайта
     */
    height: TCssHeight;
}
