import { TBreakpoint } from 'ui/types/Breakpoint';
import { ILayoutState } from '../store/LayoutState';
export declare class LayoutHelper {
    /**
     * Ключ под которым сохраняется макет сайта
     */
    static readonly KeyLayoutState: string;
    /**
     * Получение оптимальной точки Breakpoint для текущей ширины
     * @returns
     */
    static getBreakpoints(): TBreakpoint;
    /**
     * Получение рабочей высоты сайта
     * @param delta Уменьшение к расчету
     * @returns
     */
    static getClientHeight(delta?: number): number;
    /**
     * Получение отступа от нижней части
     * @param delta Увеличение к расчету
     * @returns
     */
    static geMarginBottom(delta?: number): number;
    /**
     * Загрузка макета сайта из локального хранилища
     * @returns Макет сайта или макет сайта по умолчанию
     */
    static loadFromStorage(): ILayoutState;
    /**
     * Сохранение текущего макета сайта в локальное хранилище
     * @param layoutState Макет сайта
     */
    static saveToStorage: (layoutState: ILayoutState) => void;
}
