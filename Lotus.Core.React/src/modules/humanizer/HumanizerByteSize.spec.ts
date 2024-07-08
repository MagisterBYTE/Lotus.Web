import { HumanizerByteSize } from './HumanizerByteSize';

describe('test HumanizerByteSize.ByteSize', () => 
{
  it('should return file size', () => 
  {
    expect(HumanizerByteSize.ByteSize(0)).toBe('0 КБ');
    expect(HumanizerByteSize.ByteSize(829)).toBe('0.81 КБ');
    expect(HumanizerByteSize.ByteSize(5632)).toBe('5.5 КБ');
    expect(HumanizerByteSize.ByteSize(65424)).toBe('63.89 КБ');
    expect(HumanizerByteSize.ByteSize(12345640)).toBe('11.77 МБ');
    expect(HumanizerByteSize.ByteSize(78177935360)).toBe('72.81 ГБ');
  });
});
