import { TAlertType } from '../domain/AlertType';

/**
 * Состояние обратной связи
 */
export interface IFeedbackState
{
  alertMessage: string,
  alertType: TAlertType,
  alertOpen: boolean,
}
