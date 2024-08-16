import { IAlertValue } from '../domain/AlertValue';
export declare const SHOW_ALERT_FEEDBACK: "feedback/SHOW_ALERT_FEEDBACK";
export declare const showAlertFeedbackAction: import("@reduxjs/toolkit").ActionCreatorWithPayload<IAlertValue, string>;
export declare const HIDE_ALERT_FEEDBACK: "feedback/HIDE_ALERT_FEEDBACK";
export declare const hideAlertFeedbackAction: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"feedback/HIDE_ALERT_FEEDBACK">;
