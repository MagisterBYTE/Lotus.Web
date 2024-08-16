import { TScreenType } from '../domain/ScreenType';
import { ILayoutFooter } from '../domain/LayoutFooter';
import { ILayoutHeader } from '../domain/LayoutHeader';
import { ILayoutSidePanel } from '../domain/LayoutSidePanel';
/**
 * Состояние макета сайта
 */
export interface ILayoutState {
    /**
     * Параметры типа/ориентация экрана
     */
    screenType: TScreenType;
    /**
     * Параметры шапки сайта
     */
    header: ILayoutHeader;
    /**
    * Параметры левой панели
    */
    leftPanel: ILayoutSidePanel;
    /**
    * Имена команд левой панели
    */
    leftPanelCommands?: string[];
    /**
    * Параметры правой панели
    */
    rightPanel: ILayoutSidePanel;
    /**
    * Имена команд правой панели
    */
    rightPanelCommands?: string[];
    /**
     * Параметры подвала сайта
     */
    footer: ILayoutFooter;
}
/**
 * Макет сайта по умолчанию для десктопного сайта
 */
export declare const defaultStateDesktop: ILayoutState;
