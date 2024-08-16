import React, { ComponentPropsWithRef } from 'react';
export interface IVerticalStackProps extends ComponentPropsWithRef<'div'> {
    gap?: React.CSSProperties['gap'];
    alignItems?: React.CSSProperties['alignItems'];
    justifyContent?: React.CSSProperties['justifyContent'];
    wrap?: React.CSSProperties['flexWrap'];
    children: React.ReactNode;
    fullWidth?: boolean;
    fullHeight?: boolean;
}
export declare const VerticalStack: React.FC<IVerticalStackProps>;
