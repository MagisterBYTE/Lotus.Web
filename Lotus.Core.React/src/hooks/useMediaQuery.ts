import { useLayoutEffect, useState } from 'react';

export const useMediaQuery = (mediaQuery: string) =>
{
  const isSsr = typeof window === 'undefined';

  const [matches, setMatches] = useState(() =>
    isSsr ? false : window.matchMedia(mediaQuery).matches
  );
  
  useLayoutEffect(() => 
  {
    if (isSsr) 
    {
      return;
    }
    
    const mediaQueryList = window.matchMedia(mediaQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (e: any) => setMatches(e.matches);

    mediaQueryList.addEventListener('resize', listener);
    mediaQueryList.addEventListener('orientationchange', listener);

    // eslint-disable-next-line consistent-return
    return () => 
    {
      mediaQueryList.removeEventListener('resize', listener);
      mediaQueryList.removeEventListener('orientationchange', listener);
    };
  }, [mediaQuery]);

  return matches;
}
