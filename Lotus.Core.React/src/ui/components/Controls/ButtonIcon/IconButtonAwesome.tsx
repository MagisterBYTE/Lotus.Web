/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, SxProps, Theme, useTheme } from '@mui/material';

export interface IIconButtonProps extends MuiIconButtonProps
{
  isBorder?: boolean;

  isSelected?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;

  colorIcon?: string;
}

export const IconButton:React.FC<IIconButtonProps> = ({isBorder, isSelected, icon, colorIcon,...props}:IIconButtonProps) => 
{
  const theme = useTheme();

  const selectedColor = theme.palette.primary.main;
  const infoColor = theme.palette.grey[700];

  const getSx = ():SxProps<Theme>|undefined =>
  {
    if(isBorder && isSelected)
    {
      const sx:SxProps<Theme> = {...props.sx, borderColor: selectedColor, borderWidth: 2, borderStyle: 'solid', borderRadius: '10%'}
      return sx;
    }
    else
    {
      if(isBorder)
      {
        const sx:SxProps<Theme> = {...props.sx, borderColor: infoColor, borderWidth: 1, borderStyle: 'solid', borderRadius: '10%'}
        return sx;
      }
      else
      {
        return props.sx;
      }
    } 
  }

  return (
    <MuiIconButton {...props} sx={getSx()} >
      {icon}
    </MuiIconButton>
  );
};
