import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IInformationData } from 'ui/types/InformationData';

export interface IIconPopoverInfoProps extends IInformationData
{
}

export const IconPopoverInfo:React.FC<IIconPopoverInfoProps> = ({textInfo}:IIconPopoverInfoProps) => 
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

  {textInfo && 
  <>
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
  </>}

  return <></>;
}