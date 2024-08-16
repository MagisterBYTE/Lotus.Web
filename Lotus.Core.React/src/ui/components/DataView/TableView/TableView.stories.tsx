import type { Meta, StoryObj } from '@storybook/react';
import { FilterFunctionEnum, IPropertyDescriptor, IRequest, IResponsePage, ISelectOption, 
  ObjectInfoBase, PropertyTypeEnum, ValidationResultSuccess } from 'lotus-core';
import { TableView } from './TableView';

 
const PersonRoles:ISelectOption[] = [{value: 1, text: 'Админ'}, {value: 2, text: 'Модератор'}, {value: 3, text: 'Пользователь'}]

interface IPerson
{
  id: string;  
  icon?: string;
  name: string;
  surname: string;
  roleId: number;
}

class PersonInfoBase extends ObjectInfoBase<IPerson>
{
  private static _personInfoBase: PersonInfoBase;

  public static get Instance(): PersonInfoBase 
  {
    return (this._personInfoBase || (this._personInfoBase = new this()));
  }

  constructor() 
  {
    super();
    this.Init();
  }

  private Init()
  {
    const idProp: IPropertyDescriptor =
    {
      fieldName: 'id',
      name: 'Id',
      desc: 'Идентификатор пользователя',
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const nameProp: IPropertyDescriptor =
    {
      fieldName: 'name',
      name: 'Имя',
      desc: 'Имя пользователя',
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPerson | null) =>
        {
          if (item && item.name === '')
          {
            return { error: true, text: 'Имя не может быть пустым' };
          }
          if (item && item.name.length > 20)
          {
            return { error: true, text: 'Имя не может быть больше 20 символов' };
          }
          return { error: false, text: '' };
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(nameProp);

    const surnameProp: IPropertyDescriptor =
    {
      fieldName: 'surname',
      name: 'Фамилия',
      desc: 'Фамилия пользователя',
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPerson | null) =>
        {
          if (item && item.surname === '')
          {
            return { error: true, text: 'Фамилия не может быть пустая' };
          }
          if (item && item.surname && item.surname.length > 40)
          {
            return { error: true, text: 'Фамилия не может быть больше 40 символов' };
          }
          return { error: false, text: '' };
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(surnameProp);

    const roleIdProp: IPropertyDescriptor =
    {
      fieldName: 'roleId',
      name: 'Роль',
      desc: 'Роль пользователя',
      propertyType: PropertyTypeEnum.Integer,
      isArray: true,
      options: PersonRoles,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'select',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onValidation: (_: IPerson | null) => { return ValidationResultSuccess }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.IncludeAny,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(roleIdProp);
  }
}

const Persons:IPerson[] = [
  {
    id: '1',
    name: 'Даниил',
    surname: 'Дементьев',
    roleId: 1
  },
  {
    id: '2',
    name: 'Иван',
    surname: 'Иванов',
    roleId: 2
  },
  {
    id: '3',
    name: 'Сергей',
    surname: 'Тухляк',
    roleId: 3
  }
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPersonsAsync = (filter: IRequest):Promise<IResponsePage<IPerson>> =>
{
  const response:IResponsePage = {
    payload: Persons,
    pageInfo: {currentPageSize: 4, pageNumber: 0, pageSize: 20, totalCount: 4}
  }

  return Promise.resolve(response);
}

const meta = {
  title: 'DataView/TableView',
  component: TableView,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {
  }
} satisfies Meta<typeof TableView>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    objectInfo: PersonInfoBase.Instance,
    enableColumnResizing: true,
    enableEditing:true,
    enableColumnFilterModes: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    onGetItems: getPersonsAsync
  }
};

