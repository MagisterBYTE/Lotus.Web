import React, { ComponentPropsWithRef } from 'react';

export interface IHorizontalStackProps extends ComponentPropsWithRef<'div'>
{
  gap?: React.CSSProperties['gap'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
  children: React.ReactNode;
  // eslint-disable-next-line react/boolean-prop-naming
  fullWidth?: boolean;
  // eslint-disable-next-line react/boolean-prop-naming
  fullHeight?: boolean;
}

export const HorizontalStack: React.FC<IHorizontalStackProps> = (props: IHorizontalStackProps) => 
{
  const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props
  return (
    <div {...divProps} style={{
      display: 'flex',
      flexDirection: 'row',
      gap: gap,
      alignItems: alignItems ?? 'baseline',
      justifyContent: justifyContent ?? 'flex-start',
      flexWrap: wrap,
      width: fullWidth ? '100%' : undefined,
      height: fullHeight ? '100%' : undefined
    }}>
      {children}
    </div>
  );
};