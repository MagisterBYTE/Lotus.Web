import { TColorType, TControlState } from 'ui/types';
export declare class InputFieldHelper {
    static getBorderColorProps(color: TColorType, state: TControlState): string;
    static getBackgroundProps(color: TColorType, isBackground?: boolean): string;
}
