import React, { ComponentPropsWithRef } from 'react';
import { VerticalStack } from 'ui/components/Layout';

export interface IAppLeftPanelProps extends ComponentPropsWithRef<'nav'> 
{
}

export const AppLeftPanel: React.FC<IAppLeftPanelProps> = (props: IAppLeftPanelProps) => 
{
  return <nav {...props} >
    <VerticalStack >
      {props.children}
    </VerticalStack>
  </nav>
};