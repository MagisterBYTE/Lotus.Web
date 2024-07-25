import { RootStateCore, useAppSelectorCore } from 'app/store';
import { IFeedbackState } from './FeedbackState';

export const useFeedbackState = (): IFeedbackState =>
{
  return useAppSelectorCore((state: RootStateCore) => state.feedback)
}
