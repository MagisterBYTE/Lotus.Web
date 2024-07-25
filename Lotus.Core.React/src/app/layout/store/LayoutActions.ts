import { createAction } from '@reduxjs/toolkit';
import { TScreenType } from '../domain/ScreenType';

/**
 * Установить тип экрана
 */
export const SET_SCREEN_TYPE_LAYOUT = 'layout/SET_SCREEN_TYPE_LAYOUT' as const;
export const setScreenTypeAction = createAction<TScreenType>(SET_SCREEN_TYPE_LAYOUT);

/**
 * Показать/скрыть левую панель
 */
export const SHOW_LEFT_PANEL_LAYOUT = 'layout/SHOW_LEFT_PANEL_LAYOUT' as const;
export const showLeftPanelLayoutAction = createAction<boolean>(SHOW_LEFT_PANEL_LAYOUT);

/**
 * Открыть/закрыть левую панель
 */
export const OPEN_LEFT_PANEL_LAYOUT = 'layout/OPEN_LEFT_PANEL_LAYOUT' as const;
export const openLeftPanelLayoutAction = createAction<boolean>(OPEN_LEFT_PANEL_LAYOUT);

/**
 * Добавить команду к левой панели
 */
export const ADD_COMMAND_LEFT_PANEL_LAYOUT = 'layout/ADD_COMMAND_LEFT_PANEL_LAYOUT' as const;
export const addCommandLeftPanelLayoutAction = createAction<string>(ADD_COMMAND_LEFT_PANEL_LAYOUT);

/**
 * Удалить команду из левой панели
 */
export const REMOVE_COMMAND_LEFT_PANEL_LAYOUT = 'layout/REMOVE_COMMAND_LEFT_PANEL_LAYOUT' as const;
export const removeCommandLeftPanelLayoutAction = createAction<string>(REMOVE_COMMAND_LEFT_PANEL_LAYOUT);

/**
 * Установить команды левой панели
 */
export const SET_COMMANDS_LEFT_PANEL_LAYOUT = 'layout/SET_COMMANDS_LEFT_PANEL_LAYOUT' as const;
export const setCommandsLeftPanelLayoutAction = createAction<string[]>(SET_COMMANDS_LEFT_PANEL_LAYOUT);

/**
 * Установить ширину левой панели
 */
export const SET_WIDTH_LEFT_PANEL_LAYOUT = 'layout/SET_WIDTH_LEFT_PANEL_LAYOUT' as const;
export const setWidthLeftPanelLayoutAction = createAction<number>(SET_WIDTH_LEFT_PANEL_LAYOUT);

/**
 * Установить ширину правой панели
 */
export const SHOW_RIGHT_PANEL_LAYOUT = 'layout/SHOW_RIGHT_PANEL_LAYOUT' as const;
export const showRightPanelLayoutAction = createAction<boolean>(SHOW_RIGHT_PANEL_LAYOUT);

/**
 * Показать/скрыть заголовок
 */
export const SHOW_HEADER_LAYOUT = 'layout/SHOW_HEADER_LAYOUT' as const;
export const showHeaderLayoutAction = createAction<boolean>(SHOW_HEADER_LAYOUT);

/**
 * Показать/скрыть заголовок полльзователем
 */
export const SHOW_HEADER_USER_LAYOUT = 'layout/SHOW_HEADER_USER_LAYOUT' as const;
export const showHeaderUserLayoutAction = createAction<boolean>(SHOW_HEADER_USER_LAYOUT);

/**
 * Показать/скрыть подвал
 */
export const SHOW_FOOTER_LAYOUT = 'layout/SHOW_FOOTER_LAYOUT' as const;
export const showFooterLayoutAction = createAction<boolean>(SHOW_FOOTER_LAYOUT);

/**
 * Показать/скрыть пользователем
 */
export const SHOW_FOOTER_USER_LAYOUT = 'layout/SHOW_FOOTER_USER_LAYOUT' as const;
export const showFooterUserLayoutAction = createAction<boolean>(SHOW_FOOTER_USER_LAYOUT);

/**
 * Свернуть/развернуть подвал
 */
export const COLLAPSE_FOOTER_LAYOUT = 'layout/COLLAPSE_FOOTER_LAYOUT' as const;
export const collapseFooterLayoutAction = createAction<boolean>(COLLAPSE_FOOTER_LAYOUT);