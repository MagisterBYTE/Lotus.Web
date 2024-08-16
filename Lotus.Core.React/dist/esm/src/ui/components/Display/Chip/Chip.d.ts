import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { TChipVariant } from './ChipVariant';
export interface IChipProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    /**
     * Цвет
     */
    color?: TColorType;
    /**
     * Размер чипа
     */
    size?: TControlSize;
    /**
     * Вариант отображения
     */
    variant?: TChipVariant;
    /**
     * Внутренний отступ
     */
    paddingControl?: TControlPadding;
    /**
     * Надпись
     */
    label: ReactNode;
}
export declare const Chip: React.FC<IChipProps>;
