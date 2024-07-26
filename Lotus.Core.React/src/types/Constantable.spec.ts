import { checkOfConstantable } from './Constantable';

describe('test IConstantable', () => 
{
  it('check interface', () => 
  {
    const data0 = {isConst: true};    
    const data1 = {isConst: false};
    const data2 = {isConst: ''};
    const data3 = {isconst: true};   
    expect(checkOfConstantable(null)).toBe(false);
    expect(checkOfConstantable(undefined)).toBe(false);    
    expect(checkOfConstantable(data0)).toBe(true); 
    expect(checkOfConstantable(data0)).toBe(true);
    expect(checkOfConstantable(data1)).toBe(false);
    expect(checkOfConstantable(data2)).toBe(false);
    expect(checkOfConstantable(data3)).toBe(false);
  });
});