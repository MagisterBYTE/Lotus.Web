import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type IToastWrapperProps = ToastContainerProps

export const ToastWrapper: React.FC<IToastWrapperProps> = (props: IToastWrapperProps) => 
{
  return <ToastContainer {...props} />
};