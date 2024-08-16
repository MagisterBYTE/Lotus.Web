import { MRT_Cell, MRT_Row, MRT_TableInstance } from 'material-react-table';
import React from 'react';
export interface IActionRowProps<TItem extends Record<string, any>> {
    cell: MRT_Cell<TItem>;
    table: MRT_TableInstance<TItem>;
    row: MRT_Row<TItem>;
}
export interface IEditActionRowProps<TItem extends Record<string, any>> extends IActionRowProps<TItem> {
    onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}
export declare const EditActionRow: <TItem extends Record<string, any>>(props: IEditActionRowProps<TItem>) => React.ReactNode;
