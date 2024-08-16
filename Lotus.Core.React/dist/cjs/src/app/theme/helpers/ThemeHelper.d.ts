import { TColorType, TControlSize, TCssFontSize } from 'ui/types';
import { CSSProperties } from 'react';
import { TThemeMode } from '../types';
export declare class ThemeHelper {
    /**
     * Загрузка темы из локального хранилища
     * @returns Тема или тема по умолчанию по умолчанию
     */
    static loadFromStorage(): TThemeMode;
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    static saveToStorage(theme: TThemeMode): void;
    /**
     * Получение оптимального цвета текста при указанном фоновом цвете
     * @param background Цвет фона
     * @returns Оптимальный цвет текста
     */
    static getOptimalForegroundColor(background?: TColorType): TColorType;
    /**
     * Получение оптимального размера шрифта при указанном размере элемента UI
     * @param size Размере элемента UI
     * @returns Оптимальный размера шрифта
     */
    static getFontSizeByControlSize(size?: TControlSize): TCssFontSize;
    /**
     * Получение оптимального размера шрифта при указанном размере элемента UI как свойства CSS
     * @param size Размере элемента UI
     * @returns Оптимальный размера шрифта как свойства CSS
     */
    static getFontSizeByControlSizeAsCSS(size?: TControlSize): CSSProperties;
    /**
     * Конвертация размера элемента UI в соответствующий размер шрифта в пикселях
     * @param size Размере элемента UI
     * @returns Соответствующий размер шрифта в пикселях
     */
    static convertControlSizeToFontSizeInPixel(size?: TControlSize): number;
    /**
     * Конвертация размера элемента UI в соответствующий размер шрифта в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер шрифта в rem
     */
    static convertControlSizeToFontSizeInRem(size?: TControlSize): number;
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в rem
     */
    static convertControlSizeToIconSizeInRem(size?: TControlSize): number;
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в пикселя
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в пикселя
     */
    static convertControlSizeToIconSizeInPixel(size?: TControlSize): number;
    /**
     * Получить свойства CSS по семейству шрифтов в виде текста
     * @returns Свойства CSS по семейству шрифтов в виде текста
     */
    static getFontFamilyPropsAsText(): string;
    /**
     * Получить свойства CSS по семейству шрифтов в виде CSSProperties
     * @returns Свойства CSS по семейству шрифтов в виде CSSProperties
     */
    static getFontFamilyPropsAsCSS(): CSSProperties;
    /**
     * Получить свойства CSS по границе в виде текста
     * @returns Свойства CSS по границе в виде текста
     */
    static getBorderPropsAsText(): string;
    /**
     * Получить свойства CSS по границе в виде CSSProperties
     * @returns Свойства CSS по границе в виде CSSProperties
     */
    static getBorderPropsAsCSS(): CSSProperties;
    /**
     * Получить свойства CSS по переходу в виде текста
     * @returns Свойства CSS по переходу в виде текста
     */
    static getTransitionPropsAsText(): string;
    /**
     * Получить свойства CSS по переходу в виде CSSProperties
     * @returns Свойства CSS по переходу в виде CSSProperties
     */
    static getTransitionPropsAsCSS(): CSSProperties;
    /**
     * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
     * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
     */
    static getOpacityPropsForDisabledAsText(): string;
    /**
     * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
     * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
     */
    static getOpacityPropsForDisabledAsCSS(): CSSProperties;
}
