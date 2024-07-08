import { createAction } from '@reduxjs/toolkit';
import { IAlertValue } from '../domain/AlertValue';

export const SHOW_ALERT_FEEDBACK = 'feedback/SHOW_ALERT_FEEDBACK' as const;
export const showAlertFeedbackAction = createAction<IAlertValue>(SHOW_ALERT_FEEDBACK);

export const HIDE_ALERT_FEEDBACK = 'feedback/HIDE_ALERT_FEEDBACK' as const;
export const hideAlertFeedbackAction = createAction(HIDE_ALERT_FEEDBACK);
