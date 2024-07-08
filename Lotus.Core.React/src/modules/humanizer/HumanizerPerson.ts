import { StringHelper } from 'helpers/StringHelper';

export class HumanizerPerson
{
  /**
   * 
   * @param lastName 
   * @param firstName 
   * @param patronymic 
   * @param substitutes 
   * @returns 
   */
  public static getLastNameWithInitials(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>)
  {
    if (!lastName) 
    {
      return ((substitutes && substitutes.find((sub: string | null) => !!sub)) || '');
    }

    return StringHelper.toUpperCaseAllFirstLetters(`${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`);
  };

  /**
   * 
   * @param firstName 
   * @param patronymic 
   * @param substitutes 
   * @returns 
   */
  public static getNameWithPatronymic = (firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) => 
  {
    if (!firstName) 
    {
      return ((substitutes && substitutes.find((sub: string | null) => !!sub)) || '');
    }

    return StringHelper.toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
  };

  /**
   * 
   * @param lastName 
   * @param firstName 
   * @param patronymic 
   * @param substitutes 
   * @returns 
   */
  public static getFullName(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>) 
  {
    if (!lastName) 
    {
      return HumanizerPerson.getNameWithPatronymic(firstName, patronymic, substitutes);
    }

    const nameWithPatronymic = HumanizerPerson.getNameWithPatronymic(firstName, patronymic);

    if (nameWithPatronymic) 
    {
      return StringHelper.toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
    }
    else 
    {
      return StringHelper.toUpperCaseAllFirstLetters(lastName);
    }
  }
}
