import { createSlice } from '@reduxjs/toolkit';
import { IFeedbackState } from './FeedbackState';
import { hideAlertFeedbackAction, showAlertFeedbackAction } from './FeedbackActions';


const initialState: IFeedbackState =
{
  alertMessage: '',
  alertOpen: false,
  alertType: 'Info'
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    builder.addCase(showAlertFeedbackAction, (state, action) => 
    {
      state.alertMessage = action.payload.message;
      state.alertOpen = true;
      state.alertType = action.payload.type;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(hideAlertFeedbackAction, (state, _) => 
    {
      state.alertMessage = '';
      state.alertOpen = false
    });
  }
});
