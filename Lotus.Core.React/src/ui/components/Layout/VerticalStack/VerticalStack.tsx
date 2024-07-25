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
  return (
    <div {...props} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: props.gap,
      alignItems: props.alignItems ?? 'start',
      justifyContent: props.justifyContent ?? 'flex-start',
      flexWrap: props.wrap,
      width: props.fullWidth ? 'width: 100%' : undefined,
      height: props.fullHeight ? 'height: 100%' : undefined
    }}>
      {props.children}
    </div>
  );
};