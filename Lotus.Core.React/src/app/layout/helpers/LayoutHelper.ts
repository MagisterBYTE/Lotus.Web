import { TBreakpoint } from 'ui/types/Breakpoint';
import { CssTypesHelper } from 'ui/helpers';
import { defaultStateDesktop, ILayoutState } from '../store/LayoutState';

export class LayoutHelper
{
  /**
   * Ключ под которым сохраняется макет сайта
   */
  public static readonly KeyLayoutState: string = 'lotus-layoutState' as const;

  /**
   * Получение оптимальной точки Breakpoint для текущей ширины
   * @returns 
   */
  public static getBreakpoints(): TBreakpoint
  {
    if (screen.width > 1800)
    {
      return 'xl';
    }

    return 'lg';
  }

  /**
   * Получение рабочей высоты сайта 
   * @param delta Уменьшение к расчету
   * @returns 
   */
  public static getClientHeight(delta?: number): number
  {
    const layoutState = LayoutHelper.loadFromStorage();
    const isFooter = layoutState.footer.isVisible && layoutState.footer.isVisibleUser;
    const isHeader = layoutState.header.isVisible && layoutState.header.isVisibleUser;

    let screenHeight = Math.min(screen.height, window.innerHeight);

    if (isHeader)
    {
      screenHeight -= CssTypesHelper.toPixelHeight(layoutState.header.height);
    }

    if (isFooter)
    {
      screenHeight -= CssTypesHelper.toPixelHeight(layoutState.footer.height);
    }

    if (delta)
    {
      screenHeight -= delta;
    }

    return screenHeight;
  }

  /**
   * Получение отступа от нижней части
   * @param delta Увеличение к расчету
   * @returns 
   */
  public static geMarginBottom(delta?: number): number
  {
    const layoutState = LayoutHelper.loadFromStorage();
    const footer = layoutState.footer;
    const isFooter = footer.isVisible;
    let marginBottom: number = isFooter ? CssTypesHelper.toPixelHeight(footer.height) : 0;

    if (delta)
    {
      marginBottom += delta;
    }

    return marginBottom;
  }

  /**
   * Загрузка макета сайта из локального хранилища 
   * @returns Макет сайта или макет сайта по умолчанию
   */
  public static loadFromStorage(): ILayoutState
  {
    const value = localStorage.getItem(LayoutHelper.KeyLayoutState);
    if (value)
    {
      const layoutState: ILayoutState = JSON.parse(value);
      return layoutState;
    }
    else
    {
      return defaultStateDesktop;
    }
  }

  /**
   * Сохранение текущего макета сайта в локальное хранилище
   * @param layoutState Макет сайта
   */
  public static saveToStorage = (layoutState: ILayoutState) =>
  {
    const value = JSON.stringify(layoutState);
    localStorage.setItem(LayoutHelper.KeyLayoutState, value);
  }
}