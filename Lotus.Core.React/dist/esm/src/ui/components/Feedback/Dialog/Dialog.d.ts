import { PropsWithChildren, ReactNode } from 'react';
import './Dialog.css';
export interface IDialogComponent {
    get isOpen(): boolean;
    get getReturnValue(): string;
    show(): void;
    showModal(): void;
    close(returnValue?: string): void;
}
export type IDialogProps = PropsWithChildren<{
    label?: string;
    footer?: ReactNode;
}>;
export declare const Dialog: import("react").ForwardRefExoticComponent<{
    label?: string;
    footer?: ReactNode;
} & {
    children?: ReactNode | undefined;
} & import("react").RefAttributes<IDialogComponent>>;
