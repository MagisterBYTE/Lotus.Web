
/**
 * Перечисление для типа обратной связи
 */
export const FeedbackTypeEnum =
  {
    /**
     * Простое предупреждение без взаимодействия
     */
    Alert:
    {
      id: 0,
      name: 'Alert'
    },

    /**
     * Информирование с возможностью взаимодействия 
     */
    Snackbar:
    {
      id: 1,
      name: 'Snackbar'
    },

    /**
     * Модальное окно
     */
    Modal:
    {
      id: 2,
      name: 'Modal'
    },

    /**
     * Информирование с прогрессом
     */
    Progress:
    {
      id: 3,
      name: 'Progress'
    }
  } as const;

/**
 * Тип обратной связи
 */
export type TFeedbackType = keyof typeof FeedbackTypeEnum;