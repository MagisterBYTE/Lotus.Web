import { TScreenType } from '../domain/ScreenType';
/**
 * Установить тип экрана
 */
export declare const SET_SCREEN_TYPE_LAYOUT: "layout/SET_SCREEN_TYPE_LAYOUT";
export declare const setScreenTypeAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<TScreenType, string>;
/**
 * Показать/скрыть левую панель
 */
export declare const SHOW_LEFT_PANEL_LAYOUT: "layout/SHOW_LEFT_PANEL_LAYOUT";
export declare const showLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Открыть/закрыть левую панель
 */
export declare const OPEN_LEFT_PANEL_LAYOUT: "layout/OPEN_LEFT_PANEL_LAYOUT";
export declare const openLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Добавить команду к левой панели
 */
export declare const ADD_COMMAND_LEFT_PANEL_LAYOUT: "layout/ADD_COMMAND_LEFT_PANEL_LAYOUT";
export declare const addCommandLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
/**
 * Удалить команду из левой панели
 */
export declare const REMOVE_COMMAND_LEFT_PANEL_LAYOUT: "layout/REMOVE_COMMAND_LEFT_PANEL_LAYOUT";
export declare const removeCommandLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
/**
 * Установить команды левой панели
 */
export declare const SET_COMMANDS_LEFT_PANEL_LAYOUT: "layout/SET_COMMANDS_LEFT_PANEL_LAYOUT";
export declare const setCommandsLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[], string>;
/**
 * Установить ширину левой панели
 */
export declare const SET_WIDTH_LEFT_PANEL_LAYOUT: "layout/SET_WIDTH_LEFT_PANEL_LAYOUT";
export declare const setWidthLeftPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, string>;
/**
 * Установить ширину правой панели
 */
export declare const SHOW_RIGHT_PANEL_LAYOUT: "layout/SHOW_RIGHT_PANEL_LAYOUT";
export declare const showRightPanelLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Показать/скрыть заголовок
 */
export declare const SHOW_HEADER_LAYOUT: "layout/SHOW_HEADER_LAYOUT";
export declare const showHeaderLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Показать/скрыть заголовок полльзователем
 */
export declare const SHOW_HEADER_USER_LAYOUT: "layout/SHOW_HEADER_USER_LAYOUT";
export declare const showHeaderUserLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Показать/скрыть подвал
 */
export declare const SHOW_FOOTER_LAYOUT: "layout/SHOW_FOOTER_LAYOUT";
export declare const showFooterLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Показать/скрыть пользователем
 */
export declare const SHOW_FOOTER_USER_LAYOUT: "layout/SHOW_FOOTER_USER_LAYOUT";
export declare const showFooterUserLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
/**
 * Свернуть/развернуть подвал
 */
export declare const COLLAPSE_FOOTER_LAYOUT: "layout/COLLAPSE_FOOTER_LAYOUT";
export declare const collapseFooterLayoutAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
