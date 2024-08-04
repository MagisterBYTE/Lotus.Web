import { MenuItem } from '@mui/material';
import { localizationCore } from 'lotus-core';
import { MRT_FilterOption } from 'material-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterString = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='stringContains'
      onClick={() => { onSelectFilterMode('contains'); column.filterFn = 'contains' }}>
      {localizationCore.filters.contains}
    </MenuItem>,
    <MenuItem
      key='stringEquals'
      onClick={() => onSelectFilterMode('equals')}>
      {localizationCore.filters.equals}
    </MenuItem>,
    <MenuItem
      key='stringStartsWith'
      onClick={() => onSelectFilterMode('startsWith')}>
      {localizationCore.filters.startsWith}
    </MenuItem>,
    <MenuItem
      key='stringEndsWith'
      onClick={() => onSelectFilterMode('endsWith')}>
      {localizationCore.filters.endsWith}
    </MenuItem>,
    <MenuItem
      key='stringNotEquals'
      onClick={() => onSelectFilterMode('notEquals')}>
      {localizationCore.filters.notEqual}
    </MenuItem>,
    <MenuItem
      key='stringNotEmpty'
      onClick={() => onSelectFilterMode('notEmpty')}>
      {localizationCore.filters.notEmpty}
    </MenuItem>]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterEnum = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='equals'
      onClick={() => { onSelectFilterMode('equals'); }}>
      {localizationCore.filters.equals}
    </MenuItem>,
    <MenuItem
      key='notEquals'
      onClick={() => { onSelectFilterMode('notEquals'); }}>
      {localizationCore.filters.notEqual}
    </MenuItem>]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterArray = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='includeAny'
      onClick={() => { onSelectFilterMode('includeAny'); }}>
      {localizationCore.filters.includeAny}
    </MenuItem>,
    <MenuItem
      key='includeAll'
      onClick={() => { onSelectFilterMode('includeAll'); }}>
      {localizationCore.filters.includeAll}
    </MenuItem>,
    <MenuItem
      key='includeEquals'
      onClick={() => { onSelectFilterMode('includeEquals'); }}>
      {localizationCore.filters.includeEquals}
    </MenuItem>,
    <MenuItem
      key='includeNone'
      onClick={() => { onSelectFilterMode('includeNone'); }}>
      {localizationCore.filters.includeNone}
    </MenuItem>]
} 
