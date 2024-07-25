import { IViewSettings } from '../domain/ViewSettings'

export class ViewSettingsConstants
{
  /**
   * Визуальные настройки для десктоп режима
   */
  public static readonly Desktop: IViewSettings =
    {
      headerHeight: 64,
      leftPanelWidthMax: 240,
      leftPanelWidthMin: 60,
      rightPanelWidthMax: 240,
      rightPanelWidthMin: 60,
      footerHeight: 64
    } as const;

  /**
   * Визуальные настройки для мобильного режима в портретной ориентации
   */
  public static readonly Portrait: IViewSettings =
    {
      headerHeight: 56,
      leftPanelWidthMax: 240,
      leftPanelWidthMin: 60,
      rightPanelWidthMax: 240,
      rightPanelWidthMin: 60,
      footerHeight: 56
    } as const;

  /**
   * Визуальные настройки для мобильного режима в альбомной ориентации
   */
  public static readonly Landscape: IViewSettings =
    {
      headerHeight: 56,
      leftPanelWidthMax: 240,
      leftPanelWidthMin: 120,
      rightPanelWidthMax: 240,
      rightPanelWidthMin: 80,
      footerHeight: 56
    } as const;
}