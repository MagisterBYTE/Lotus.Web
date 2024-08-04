import { Edit } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { localizationCore } from 'lotus-core';
import { MRT_Cell, MRT_Row, MRT_TableInstance } from 'material-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IActionRowProps<TItem extends Record<string, any>>
{
  cell: MRT_Cell<TItem>;
  table: MRT_TableInstance<TItem>;
  row: MRT_Row<TItem>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IEditActionRowProps<TItem extends Record<string, any>> extends IActionRowProps<TItem>
{
  onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditActionRow = <TItem extends Record<string, any>>(props: IEditActionRowProps<TItem>): React.ReactNode =>
{
  const { table, row } = props;

  return (<Tooltip arrow placement='left' title={localizationCore.actions.edit}>
    <IconButton size='large' onClick={() => { props.onEditRow(table, row) }}>
      <Edit />
    </IconButton>
  </Tooltip>)
}