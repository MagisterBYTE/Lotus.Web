import { ToastOptions } from 'react-toastify';
export declare const toastPromise: <TData>(promise: Promise<TData> | (() => Promise<TData>), textPending: string, textSuccess: string, textFailed: string, options?: ToastOptions<TData>) => Promise<TData>;
