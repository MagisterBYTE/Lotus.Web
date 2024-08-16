import React, { ComponentPropsWithRef } from 'react';
import { TColorType } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';
import './Typography.css';
export interface ITypographyProps extends ComponentPropsWithRef<'p'> {
    /**
     * Цвет
     */
    color?: TColorType;
    /**
     * Вариант отображения
     */
    variant?: TTypographyVariant;
}
export declare const Typography: React.FC<ITypographyProps>;
