import React, { ComponentPropsWithRef } from 'react';
import { useLayoutState } from 'app/layout/store';
import './AppFooter.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppFooterProps extends ComponentPropsWithRef<'footer'> 
{
}

export const AppFooter: React.FC<IAppFooterProps> = (props: IAppFooterProps) => 
{
  const layoutState = useLayoutState();

  return <>{layoutState.footer.isVisibleUser && layoutState.footer.isVisible &&
    <footer {...props} className='lotus-app-footer'>
      {props.children}
    </footer>
  }
  </>
};
