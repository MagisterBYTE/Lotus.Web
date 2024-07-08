import React from 'react';
import { instanceOfResult } from 'types';
import { IToastErrorProps } from './toastError';

export const ToastErrorPanel:React.FC<IToastErrorProps> = ({title, error}:IToastErrorProps) =>
{
  const result = instanceOfResult(error);
  if(result)
  {
    return <>
      <p style={{fontSize: '0.9em'}}>{title}</p>
      <p style={{fontSize: '0.8em'}}>Code: {result.code}</p>
      <p style={{fontSize: '0.8em'}}>Message: {result.message}</p>
      {result.data && <p style={{fontSize: '0.8em'}}>Data: {result.data}</p>}
    </>;
  }
  else
  {
    const authError = error['error'] && error['error_description'];
    if(authError)
    {
      return <>
        <p style={{fontSize: '0.9em'}}>{title}</p>
        <p style={{fontSize: '0.8em'}}>Error: {authError.error}</p>
        <p style={{fontSize: '0.8em'}}>Message: {authError.error_description}</p>
      </>;
    }
    else
    {
      return <>
        <span style={{fontSize: '0.9em'}}>{title}</span><br />
        <span style={{fontSize: '0.8em'}}>Error: {error.toString()}</span><br />
      </>;
    }
  }
} 
