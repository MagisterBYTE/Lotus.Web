import { PropsWithChildren, ReactNode } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Button } from 'ui/components/Controls';
import './Dialog.css';
import { cx } from '@emotion/css';

export interface IDialogComponent
{
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

export const Dialog = forwardRef<IDialogComponent, IDialogProps>(function Dialog({ label, footer, children }, ref) 
{
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => 
    {
      return {
        get isOpen() 
        {
          return dialogRef?.current?.open;
        },
        get getReturnValue() 
        {
          return dialogRef?.current?.returnValue;
        },
        show() 
        {
          dialogRef?.current?.show();
        },
        showModal() 
        {
          dialogRef?.current?.showModal();
        },
        close(returnValue?: string) 
        {
          dialogRef?.current?.close(returnValue);
        }
      } as IDialogComponent;
    },
    []
  );

  const handleButtonCloseClick = () => 
  {
    dialogRef?.current?.close();
  };

  const dialogClass = cx('lotus-dialog');

  return (
    <dialog
      ref={dialogRef}
      className={dialogClass}
    >
      <div className='lotus-dialog-main'>
        <div className='lotus-dialog-header'>
          {label && (
            <div className='lotus-dialog-header-text'>{label}</div>
          )}

          <button onClick={handleButtonCloseClick} className='lotus-dialog-header-button'> ✕ </button>
        </div>


        <div className='lotus-dialog-body'>
          {children}
        </div>

        <div className='lotus-dialog-footer'>
          {footer}
          <Button value='Ок' label='Ок' variant='outline' />
          <Button onClick={handleButtonCloseClick} value='Cancel' label='Cancel' variant='outline' />
        </div>
      </div>
    </dialog>
  );
});
