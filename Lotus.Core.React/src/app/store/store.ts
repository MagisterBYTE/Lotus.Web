import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { feedbackSlice } from 'modules/feedback/store/FeedbackSlice';

export function makeStoreCore() 
{
  return configureStore({
    reducer: {
      feedback: feedbackSlice.reducer
    }
  });
}

export const storeCore = makeStoreCore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateCore = ReturnType<typeof storeCore.getState>;

// Inferred type: {auth: AuthState, form: FormState, weather: WeatherState}
export type AppDispatchCore = typeof storeCore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateCore,
  unknown,
  Action<string>
>;
