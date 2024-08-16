import { IViewSettings } from '../domain/ViewSettings';
export declare class ViewSettingsConstants {
    /**
     * Визуальные настройки для десктоп режима
     */
    static readonly Desktop: IViewSettings;
    /**
     * Визуальные настройки для мобильного режима в портретной ориентации
     */
    static readonly Portrait: IViewSettings;
    /**
     * Визуальные настройки для мобильного режима в альбомной ориентации
     */
    static readonly Landscape: IViewSettings;
}
