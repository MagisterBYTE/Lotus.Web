import React, { ComponentPropsWithRef } from 'react';
import { VerticalStack } from 'ui/components/Layout';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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