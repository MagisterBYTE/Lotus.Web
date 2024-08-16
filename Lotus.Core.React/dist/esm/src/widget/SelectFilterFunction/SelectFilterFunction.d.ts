import { IFilterFunctionDesc } from 'lotus-core';
import React from 'react';
export interface ISelectFilterFunctionProps {
    initialFunctionFn?: IFilterFunctionDesc;
    onSelectFilterFunction: (filterFunction: IFilterFunctionDesc) => void;
    groupFilterFunctions: IFilterFunctionDesc[];
}
export declare const SelectFilterFunction: React.FC<ISelectFilterFunctionProps>;
