import { useLayoutEffect } from 'react';

/**
 * Хук для вызова функции в случае изменения размера или ориентации экрана
 * @param callback Вызываемая функция
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const useScreenResizeOrOrientation = (callback: Function) =>
{
  const handleScreenResizeOrOrientation = () =>
  {
    callback();
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenResizeOrOrientation);
    window.addEventListener('orientationchange', handleScreenResizeOrOrientation);

    callback();

    return () => 
    {
      window.removeEventListener('resize', handleScreenResizeOrOrientation);
      window.removeEventListener('orientationchange', handleScreenResizeOrOrientation);
    };
  }, [])
}