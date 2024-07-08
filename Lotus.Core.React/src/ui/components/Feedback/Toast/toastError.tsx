import { toast } from 'react-toastify';
import { ToastErrorPanel } from './ToastErrorPanel';

export interface IToastErrorProps
{
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toastError = (error: any, title: string) =>
{
  // eslint-disable-next-line react/react-in-jsx-scope
  return toast.error(<ToastErrorPanel error={error} title={title} />);
};