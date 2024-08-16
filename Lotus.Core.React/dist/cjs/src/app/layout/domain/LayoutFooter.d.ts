import { TCssHeight } from 'ui/types/CssTypes';
/**
 * Параметры подвала сайта
 */
export interface ILayoutFooter {
    /**
     * Виден основной футер/подвал сайта по настройкам пользователя
     */
    isVisibleUser: boolean;
    /**
     * Виден основной футер/подвал сайта по логике макета
     */
    isVisible: boolean;
    /**
     * Свернут футер/подвал сайта
     */
    isCollapsed: boolean;
    /**
     * Высота футера/подвала сайта
     */
    height: TCssHeight;
}
