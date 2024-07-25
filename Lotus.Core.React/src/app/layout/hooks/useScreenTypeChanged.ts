import { useLayoutEffect } from 'react';
import { useAppDispatchCore } from 'app/store';
import { TScreenType } from '../domain/ScreenType';
import { setScreenTypeAction } from '../store/LayoutActions';

export const useScreenTypeChanged = () =>
{
  const isDesktopQuery = '(min-width: 1280px)';
  const isPortraitQuery = '(orientation: portrait)';

  const dispacth = useAppDispatchCore();

  const handleScreenTypeChange = () =>
  {
    const isDesktop = window.matchMedia(isDesktopQuery).matches;
    const isPortrait = window.matchMedia(isPortraitQuery).matches;

    if (isPortrait)
    {
      dispacth(setScreenTypeAction(TScreenType.Portrait));
    }
    else
    {
      if (isDesktop)
      {
        dispacth(setScreenTypeAction(TScreenType.Desktop));
      }
      else
      {
        dispacth(setScreenTypeAction(TScreenType.Landscape));
      }
    }
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenTypeChange);
    window.addEventListener('orientationchange', handleScreenTypeChange);

    return () => 
    {
      window.removeEventListener('resize', handleScreenTypeChange);
      window.removeEventListener('orientationchange', handleScreenTypeChange);
    };
  }, [])
}