import { HumanizerPerson } from './HumanizerPerson';

describe('test HumanizerPerson.getLastNameWithInitials', () => 
{
  it('should return lastName + initials if all arguments (except subtitude) were passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('last', 'first', 'patronymic', ['sub1, sub2'])).toBe('Last F. P.');
    expect(HumanizerPerson.getLastNameWithInitials('Last', 'First', 'patronymic', ['sub1, sub2'])).toBe('Last F. P.');
  });

  it('should return first non-empty substitude if lastName was not passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('', 'first', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(HumanizerPerson.getLastNameWithInitials('', 'first', 'patronymic', ['', 'sub2','sub3'])).toBe('sub2');
    expect(HumanizerPerson.getLastNameWithInitials('', 'first', 'patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no lastName and substitude were passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('', '', 'patronymic', ['', ''])).toBe('');
    expect(HumanizerPerson.getLastNameWithInitials('', 'first', 'patronymic', [''])).toBe('');
  });

  it('should return lastName + patronymic initial if no firstName was passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('last', '', 'patronymic', ['', 'sub2'])).toBe('Last P.');
    expect(HumanizerPerson.getLastNameWithInitials('Last', '', 'Patronymic', ['', 'sub2'])).toBe('Last P.');
  });

  it('should return lastName + firstName initial if no patronymic was passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('last', 'first', '', ['sub1', 'sub2'])).toBe('Last F.');
    expect(HumanizerPerson.getLastNameWithInitials('Last', 'First', '', ['sub1', 'sub2'])).toBe('Last F.');
  });

  it('should return only lastName if no patronymic and firstName were passed', () => 
  {
    expect(HumanizerPerson.getLastNameWithInitials('last', '', '', ['sub1', 'sub2'])).toBe('Last');
    expect(HumanizerPerson.getLastNameWithInitials('Last', '', '', ['sub1', 'sub2'])).toBe('Last');
  });
});

describe('test HumanizerPerson.getNameWithPatronymic', () => 
{
  it('should return firstName + patronymic if all arguments (except subtitude) were passed', () => 
  {
    expect(HumanizerPerson.getNameWithPatronymic('first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
    expect(HumanizerPerson.getNameWithPatronymic('First', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
  });

  it('should return first non-empty substitude if firstName was not passed', () => 
  {
    expect(HumanizerPerson.getNameWithPatronymic('', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(HumanizerPerson.getNameWithPatronymic('', 'patronymic', ['', 'sub2', 'sub3'])).toBe('sub2');
    expect(HumanizerPerson.getNameWithPatronymic('', 'patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no firstName and substitude were passed', () => 
  {
    expect(HumanizerPerson.getNameWithPatronymic('', 'patronymic', ['', ''])).toBe('');
    expect(HumanizerPerson.getNameWithPatronymic('', 'Patronymic', [''])).toBe('');
  });

  it('should return only firstName if no patronymic was passed', () => 
  {
    expect(HumanizerPerson.getNameWithPatronymic('first', '', ['sub1', 'sub2'])).toBe('First');
    expect(HumanizerPerson.getNameWithPatronymic('First', '', ['sub1', 'sub2'])).toBe('First');
  });
});

describe('test HumanizerPerson.getFullName', () => 
{
  it('should return full name if all arguments (except subtitude) were passed', () => 
  {
    expect(HumanizerPerson.getFullName('last', 'first', 'patronymic', ['sub1, sub2'])).toBe('Last First Patronymic');
    expect(HumanizerPerson.getFullName('Last', 'First', 'patronymic', ['sub1, sub2'])).toBe('Last First Patronymic');
  });

  it('should return first non-empty substitude if no firstName and lastName were passed', () => 
  {
    expect(HumanizerPerson.getFullName('', '', 'patronymic', ['', '', 'sub3'])).toBe('sub3');
    expect(HumanizerPerson.getFullName('', '', '', ['', 'sub2', 'sub3'])).toBe('sub2');
    expect(HumanizerPerson.getFullName('', '', 'Patronymic', ['sub1', '', 'sub3'])).toBe('sub1');
  });

  it('should return empty string if no firstName, lastName or substitudes were passed', () => 
  {
    expect(HumanizerPerson.getFullName('', '', 'patronymic', ['', ''])).toBe('');
    expect(HumanizerPerson.getFullName('', '', '', [''])).toBe('');
  });

  it('should return firstName + patronymic if no lastName was passed', () => 
  {
    expect(HumanizerPerson.getFullName('', 'first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
    expect(HumanizerPerson.getFullName('', 'first', 'patronymic', ['sub1, sub2'])).toBe('First Patronymic');
  });

  it('should return only lastName if no firstName and patronymic was passed', () => 
  {
    expect(HumanizerPerson.getFullName('last', '', '', ['sub1', 'sub2'])).toBe('Last');
    expect(HumanizerPerson.getFullName('Last', '', '', ['sub1', 'sub2'])).toBe('Last');
  });

  it('should return only firstName if no lastName and patronymic was passed', () => 
  {
    expect(HumanizerPerson.getFullName('', 'first', '', ['sub1', 'sub2'])).toBe('First');
    expect(HumanizerPerson.getFullName('', 'First', '', ['sub1', 'sub2'])).toBe('First');
  });
});
