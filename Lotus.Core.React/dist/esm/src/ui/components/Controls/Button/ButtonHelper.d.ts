import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { TButtonVariant } from './ButtonVariant';
export declare class ButtonHelper {
    static getBorderColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string;
    static getBackgroundColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string;
    static getColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string;
    static getPaddingSidesProps(size: TControlSize, paddingControl: TControlPadding): string;
}
