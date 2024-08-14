import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { TTypographyVariant } from 'ui/components/Display';
import { HorizontalStack } from 'ui/components/Layout';
import { Button } from '../Button';
import { InputField } from './InputField';

const meta = {
  title: 'Controls/InputField',
  component: InputField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onClick: fn() },

  argTypes: {
    color: {
      control: 'select',
      options: Object.values(TColorType)
    },
    size: {
      control: 'select',
      options: Object.values(TControlSize)
    },
    paddingControl: {
      control: 'radio',
      options: Object.values(TControlPadding)
    }
  }

} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelTop: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    labelProps: { label: 'Имя', variant: TTypographyVariant.TitleMedium, isTopLabel: true }
  }
};


export const LabelLeft: Story = {
  args: {
    color: TColorType.Primary,
    isBackground: true,
    placeholder: 'Введите текст',
    labelProps: { label: 'Фамилия', variant: TTypographyVariant.TitleMedium, isTopLabel: false }
  }
};

export const Password: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'password'
  }
};

export const Color: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'color'
  }
};

export const DatetimeLocal: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'datetime-local'
  }
};

export const NumberLocal: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'number'
  }
};

export const Search: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'search'
  }
};

export const Telephone: Story = {
  args: {
    color: TColorType.Primary,
    placeholder: 'Введите текст',
    type: 'tel'
  }
};

export const Disabled: Story = {
  args: {
    color: TColorType.Primary,
    disabled: true
  }
};

export const InputFieldWithButton: Story = {
  args: {
    color: TColorType.Primary,
    disabled: true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack gap='0.5rem' >
        <InputField labelProps={{ label: 'Введите фамилию' }} size={args.size} color={args.color} paddingControl={args.paddingControl} />
        <Button children='Отправить' size={args.size} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};


