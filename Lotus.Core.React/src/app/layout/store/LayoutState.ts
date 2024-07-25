import { TScreenType } from '../domain/ScreenType';
import { ILayoutFooter } from '../domain/LayoutFooter';
import { ILayoutHeader } from '../domain/LayoutHeader';
import { ILayoutSidePanel } from '../domain/LayoutSidePanel';
import { ViewSettingsConstants } from '../constants';

/**
 * Состояние макета сайта
 */
export interface ILayoutState
{
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
export const defaultStateDesktop: ILayoutState = {

  screenType: TScreenType.Desktop,

  header:
  {
    height: ViewSettingsConstants.Desktop.headerHeight,
    isVisible: true,
    isVisibleUser: true
  },
  leftPanel:
  {
    isVisible: true,
    isOpen: false,
    maxWidth: ViewSettingsConstants.Desktop.leftPanelWidthMax,
    minWidth: ViewSettingsConstants.Desktop.leftPanelWidthMin,
    width: ViewSettingsConstants.Desktop.leftPanelWidthMin
  },
  rightPanel:
  {
    isVisible: false,
    isOpen: false,
    maxWidth: ViewSettingsConstants.Desktop.rightPanelWidthMax,
    minWidth: ViewSettingsConstants.Desktop.rightPanelWidthMin,
    width: ViewSettingsConstants.Desktop.rightPanelWidthMin
  },
  footer:
  {
    height: ViewSettingsConstants.Desktop.footerHeight,
    isVisible: true,
    isVisibleUser: true,
    isCollapsed: true
  }
};
