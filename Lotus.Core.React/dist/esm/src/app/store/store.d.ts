import { Action, ThunkAction } from '@reduxjs/toolkit';
export declare function makeStoreCore(): import("@reduxjs/toolkit").EnhancedStore<{
    feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
    layout: import("../layout/store/LayoutState").ILayoutState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
        layout: import("../layout/store/LayoutState").ILayoutState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const storeCore: import("@reduxjs/toolkit").EnhancedStore<{
    feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
    layout: import("../layout/store/LayoutState").ILayoutState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        feedback: import("../../modules/feedback/store/FeedbackState").IFeedbackState;
        layout: import("../layout/store/LayoutState").ILayoutState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootStateCore = ReturnType<typeof storeCore.getState>;
export type AppDispatchCore = typeof storeCore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateCore, unknown, Action<string>>;
