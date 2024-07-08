/**
 * 
 * @param timeoutInMs 
 * @returns 
 */
export const sleep = (timeoutInMs: number) => 
{
  return new Promise<number>((resolve) => setTimeout(resolve, timeoutInMs));
}
