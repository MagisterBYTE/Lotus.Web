import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { TChipVariant } from './ChipVariant';
export declare class ChipHelper {
    static getBorderColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string;
    static getBackgroundColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string;
    static getColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string;
    static getPaddingSidesProps(size: TControlSize, paddingControl: TControlPadding): string;
}
