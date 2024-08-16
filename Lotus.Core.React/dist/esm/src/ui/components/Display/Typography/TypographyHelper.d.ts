import { TControlSize } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';
export declare class TypographyHelper {
    /**
     * Получение оптимального варианта текста при указанном размере элемента UI
     * @param size Размере элемента UI
     * @returns Оптимальный варианта текста
     */
    static getTypographyVariantByControlSize(size?: TControlSize): TTypographyVariant;
}
