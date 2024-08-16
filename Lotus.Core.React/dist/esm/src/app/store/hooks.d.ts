import { type TypedUseSelectorHook } from 'react-redux';
import { RootStateCore } from './store';
export declare const useAppDispatchCore: () => import("redux-thunk").ThunkDispatch<{
    feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
    layout: import("../layout/store/LayoutState").ILayoutState;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelectorCore: TypedUseSelectorHook<RootStateCore>;
