import React, { ComponentPropsWithRef } from 'react';
export interface IGridProps extends ComponentPropsWithRef<'div'> {
    gridTemplateColumns: React.CSSProperties['gridTemplateColumns'];
    gridTemplateRows: React.CSSProperties['gridTemplateRows'];
    columnGap?: React.CSSProperties['columnGap'];
    rowGap?: React.CSSProperties['rowGap'];
    horizontalAlign?: React.CSSProperties['justifyContent'];
    verticalAlign?: React.CSSProperties['alignContent'];
    horizontalContentAlign?: React.CSSProperties['justifyItems'];
    verticalContentAlign?: React.CSSProperties['alignItems'];
}
export declare const Grid: React.FC<IGridProps>;
