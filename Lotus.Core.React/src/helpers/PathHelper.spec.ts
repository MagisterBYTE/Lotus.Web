import { PathHelper } from './PathHelper';

describe('test PathHelper.splitNameAndExtension', () => 
{
  it('should return file name and extension', () => 
  {
    expect(PathHelper.splitNameAndExtension('')).toEqual(['', '']);
    expect(PathHelper.splitNameAndExtension('name.ext')).toEqual(['name', '.ext']);
    expect(PathHelper.splitNameAndExtension('name_-123')).toEqual(['name_-123', '']);
    expect(PathHelper.splitNameAndExtension('name.')).toEqual(['name', '.']);
    expect(PathHelper.splitNameAndExtension('.ext')).toEqual(['', '.ext']);
    expect(PathHelper.splitNameAndExtension('..ext')).toEqual(['.', '.ext']);
    expect(PathHelper.splitNameAndExtension('pre.name.suf.ext')).toEqual(['pre.name.suf', '.ext']);
  });
});
