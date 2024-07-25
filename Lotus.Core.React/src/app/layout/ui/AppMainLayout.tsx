import * as React from 'react';
import { ReactElement } from 'react';
import { HorizontalStack } from 'ui/components';
import { useLayoutState } from '../store/LayoutSelector';
import { TScreenType } from '../domain/ScreenType';
import { AppHeader } from './components/AppHeader';
import { AppLeftPanel } from './components/AppLeftPanel';
import { AppFooter } from './components/AppFooter';

export interface IAppMainLayoutProps
{
  page: ReactElement;
}

export const AppMainLayout: React.FC<IAppMainLayoutProps> = ({ page }: IAppMainLayoutProps) => 
{
  const layoutState = useLayoutState();

  if (layoutState.screenType != TScreenType.Landscape)
  {
    return (
      <>
        <AppHeader />
        <AppLeftPanel />
        {page}
        <AppFooter />
      </>);
  }
  else
  {
    return (
      <HorizontalStack>
        <AppLeftPanel />
        {page}
      </HorizontalStack>);
  }
};
