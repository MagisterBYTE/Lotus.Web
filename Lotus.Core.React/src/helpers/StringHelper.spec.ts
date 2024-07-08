import { StringHelper } from './StringHelper';

describe('test StringHelper.capitalizeFirstLetter', () => 
{
  it('should capitalize first letter', () => 
  {
    expect(StringHelper.capitalizeFirstLetter('текст 123')).toBe('Текст 123');
    expect(StringHelper.capitalizeFirstLetter('тЕКСТ')).toBe('ТЕКСТ');
  });

  it('should return the same string if first symbol cannot be capitalized', () => 
  {
    expect(StringHelper.capitalizeFirstLetter('123 текст')).toBe('123 текст');
    expect(StringHelper.capitalizeFirstLetter('<> текст')).toBe('<> текст');
    expect(StringHelper.capitalizeFirstLetter('555')).toBe('555');
  });

  it('should return an empty string if it was passed', () => 
  {
    expect(StringHelper.capitalizeFirstLetter('')).toBe('');
  });
});
