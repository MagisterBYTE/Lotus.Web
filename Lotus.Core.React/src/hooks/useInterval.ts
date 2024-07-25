import { useEffect, useRef } from 'react'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// eslint-disable-next-line @typescript-eslint/ban-types
export const useInterval = (callback: Function, delay: number) => 
{
  // eslint-disable-next-line @typescript-eslint/ban-types
  const savedCallback = useRef<Function>()
  useEffect(() => 
  {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => 
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (...args: any) => savedCallback.current?.(...args)

    if (delay !== null) 
    {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
