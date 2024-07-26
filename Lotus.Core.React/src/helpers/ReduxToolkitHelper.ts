import { SerializedError } from '@reduxjs/toolkit';

export class ReduxToolkitHelper
{
  public static getErrorText(value: SerializedError) 
  {
    const newChar = '\n';
    return `code = ${value.code}${newChar}name = ${value.name}${newChar}message = ${value.message}`;
  }
}
