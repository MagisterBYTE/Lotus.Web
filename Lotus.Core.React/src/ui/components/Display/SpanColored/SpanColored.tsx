import React from 'react';

export interface ISpanColoredProps extends React.HTMLProps<HTMLSpanElement>
{
  text: string;
}

export const SpanColored:React.FC<ISpanColoredProps> = (props:ISpanColoredProps) => 
{
  return (
    <span
      {...props}
      style={
        {
          borderRadius: 2,
          borderStyle: 'solid',
          borderWidth: '1px'
        }
      }
    >
      {props.text}
    </span>
  );
};
