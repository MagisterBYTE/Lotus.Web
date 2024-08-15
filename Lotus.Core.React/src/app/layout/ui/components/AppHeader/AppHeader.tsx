import React, { ComponentPropsWithRef } from 'react';
import { openLeftPanelLayoutAction, useLayoutState } from 'app/layout/store';
import { useAppDispatchCore } from 'app/store';
import './AppHeader.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppHeaderProps extends ComponentPropsWithRef<'header'> 
{

}

export const AppHeader: React.FC<IAppHeaderProps> = (props: IAppHeaderProps) => 
{
  const layoutState = useLayoutState();
  const dispatch = useAppDispatchCore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleDrawer = () => 
  {
    const status = !layoutState.leftPanel.isOpen;
    dispatch(openLeftPanelLayoutAction(status));
  };

  return <>{layoutState.header.isVisibleUser && layoutState.header.isVisible &&
    <header {...props} className='lotus-app-header'>
      {props.children}
    </header>}
  </>
};

