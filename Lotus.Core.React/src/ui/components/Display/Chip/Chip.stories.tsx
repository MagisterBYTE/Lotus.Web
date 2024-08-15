import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { FcCloth } from 'react-icons/fc';
import { Chip } from './Chip';
import { TChipVariant } from './ChipVariant';

const meta = {
  title: 'Display/Chip',
  component: Chip,
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
    variant: {
      control: 'select',
      options: Object.values(TChipVariant)
    },
    paddingControl: {
      control: 'radio',
      options: Object.values(TControlPadding)
    }
  }
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    label: 'А'
  }
};

export const Dark: Story = {
  args: {
    color: TColorType.Dark,
    label: 'А'
  }
};

export const IconBase: Story = {
  args: {
    color: TColorType.Dark,
    label: <FcCloth />
  }
};
