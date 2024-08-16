import { CSSProperties } from 'react';
import { TColorType, TControlSize } from 'ui/types';
export declare class SelectHelper {
    private static getGapFromSize;
    static getMainContainerHeightFromSize(size: TControlSize): number;
    static getBorderColorProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties;
    static getBoxShadowProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties;
    static getFlexContainer(size: TControlSize): CSSProperties;
    static getMarginOffsetInput(size: TControlSize): number;
    static getMarginOffsetSingleValue(size: TControlSize): number;
    static getPaddingLeftOption(size: TControlSize): number;
}
