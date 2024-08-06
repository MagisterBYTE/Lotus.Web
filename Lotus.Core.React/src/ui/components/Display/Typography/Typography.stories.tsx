import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorType } from 'ui/types';
import { Typography } from './Typography';
import { TTypographyVariant } from './TypographyVariant';

const meta = {
  title: 'Display/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {
    color: {
      control: 'select',
      options: Object.values(TColorType)
    },
    variant: {
      control: 'select',
      options: Object.values(TTypographyVariant)
    }
  },

  args: { onClick: fn() }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: TTypographyVariant.Body1,
    color: undefined,
    children: `Активная матрица на органических светодиодах (Active Matrix Organic Light-Emitting Diode, AMOLED) — 
    технология создания дисплеев для мобильных устройств, компьютерных мониторов и телевизоров, созданная конгломератом Samsung. 
    Технология подразумевает использование органических светодиодов в качестве светоизлучающих элементов и 
    активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами`
  }
};

export const Caption1: Story = {
  args: {
    color: TColorType.Secondary,
    variant: TTypographyVariant.Body2,
    children: 'Имя персонажа'
  }
};
