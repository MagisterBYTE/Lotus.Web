import React, { CSSProperties, useState } from 'react';
import { IconButton, Popover, SxProps, Typography } from '@mui/material';
import { IInformationData } from 'ui/types/InformationData';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export interface ILabelProps extends IInformationData
{
  /**
   * Надпись
   */
  label?: React.ReactNode;

  /**
   * Визуальные параметры надпись
   */
  labelStyle?: SxProps;

  /**
   * Размещать надпись сверху
   */
  isTopLabel?:boolean;

  /**
   * Дочерние компоненты
   */
  children?: React.ReactNode;

  /**
   * 100% ширина
   */
  // eslint-disable-next-line react/boolean-prop-naming
  fullWidth?:boolean;
}

export const Label:React.FC<ILabelProps> = ({textInfo, label, labelStyle, isTopLabel, children, fullWidth}:ILabelProps) => 
{
  const [anchorElemInfo, setAnchorElemInfo] = React.useState<HTMLButtonElement|null>(null);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleOpenInfo = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    setOpenInfo(true);
    setAnchorElemInfo(event.currentTarget);
  };

  const handleCloseInfo = () => 
  {
    setOpenInfo(false);
    setAnchorElemInfo(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flexDirection:any  = isTopLabel === true ? 'column' : 'row';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const alignItems: any = isTopLabel === true ? 'flex-start' : 'center';

  const cssProps:CSSProperties = fullWidth ? 
    {
      display: 'flex', 
      flexDirection: flexDirection, 
      justifyContent: 'flex-start',
      alignItems: alignItems,
      width: '100%' 
    } : 
    {
      display: 'flex', 
      flexDirection: flexDirection, 
      justifyContent: 'flex-start',
      alignItems: alignItems
    }

  if(isTopLabel && textInfo && (label || children))
  {
    return (
      <div style={cssProps}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <IconButton onClick={handleOpenInfo}>
            <HelpOutlineIcon />
          </IconButton>
          <Popover
            open={openInfo}
            anchorEl={anchorElemInfo}
            onClose={handleCloseInfo}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <Typography sx={{ p: 1 }}>{textInfo}</Typography>
          </Popover>    
          {label && <Typography sx={labelStyle}>{label}</Typography>}
        </div>
        {children}
      </div>
      
    )
  }

  if(textInfo && (label || children))
  {
    return (
      <div style={cssProps}>
        <IconButton onClick={handleOpenInfo}>
          <HelpOutlineIcon />
        </IconButton>
        <Popover
          open={openInfo}
          anchorEl={anchorElemInfo}
          onClose={handleCloseInfo}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Typography sx={{ p: 1 }}>{textInfo}</Typography>
        </Popover>
        {label && <Typography sx={labelStyle}>{label}</Typography>}
        {children}
      </div>
    )
  }

  if(label)
  {
    return (
      <div style={cssProps}>
        <Typography sx={labelStyle}>{label}</Typography>
        {children}
      </div>
    )
  }

  return <>{children}</>;
}