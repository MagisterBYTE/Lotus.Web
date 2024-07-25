import React, { ComponentPropsWithRef } from 'react';

export interface IGridProps extends ComponentPropsWithRef<'div'>
{
  gridTemplateColumns: React.CSSProperties['gridTemplateColumns'];
  gridTemplateRows: React.CSSProperties['gridTemplateRows'];
  columnGap?: React.CSSProperties['columnGap'];
  rowGap?: React.CSSProperties['rowGap'];
  horizontalAlign?: React.CSSProperties['justifyContent'];
  verticalAlign?: React.CSSProperties['alignContent'];
  horizontalContentAlign?: React.CSSProperties['justifyItems'];
  verticalContentAlign?: React.CSSProperties['alignItems'];
}

export const Grid: React.FC<IGridProps> = (props: IGridProps) => 
{
  return (
    <div {...props} style={{
      display: 'grid',
      gridTemplateColumns: props.gridTemplateColumns,
      gridTemplateRows: props.gridTemplateRows,
      columnGap: props.columnGap,
      rowGap: props.rowGap,
      justifyContent: props.horizontalAlign ?? 'stretch',
      alignContent: props.verticalAlign ?? 'center',
      justifyItems: props.horizontalContentAlign ?? 'start',
      alignItems: props.verticalContentAlign ?? 'center'
    }}>
      {props.children}
    </div>
  );
};