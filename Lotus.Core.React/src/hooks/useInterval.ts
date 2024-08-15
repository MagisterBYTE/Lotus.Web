import { useEffect, useRef } from 'react'


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useInterval = (callback: Function, delay: number) => 
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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
