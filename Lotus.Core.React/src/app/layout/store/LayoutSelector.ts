import { RootStateCore, useAppSelectorCore } from 'app/store';
import { ILayoutState } from './LayoutState';

export const useLayoutState = (): ILayoutState =>
{
  return useAppSelectorCore((state: RootStateCore) => state.layout)
}
