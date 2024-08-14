import React, { ComponentPropsWithRef } from 'react';

export interface IVerticalStackProps extends ComponentPropsWithRef<'div'>
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

export const VerticalStack: React.FC<IVerticalStackProps> = (props: IVerticalStackProps) => 
{
  const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props
  return (
    <div {...divProps} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      alignItems: alignItems ?? 'start',
      justifyContent: justifyContent ?? 'flex-start',
      flexWrap: wrap,
      width: fullWidth ? '100%' : undefined,
      height: fullHeight ? '100%' : undefined
    }}>
      {children}
    </div>
  );
};