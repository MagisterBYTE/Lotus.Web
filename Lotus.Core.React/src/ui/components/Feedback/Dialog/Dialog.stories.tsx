import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dialog, IDialogComponent } from './Dialog';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs']

} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Сохранить файл'
  },

  render: (args) =>
  {
    const ref = React.createRef<IDialogComponent>();
    const handleOpenDialog = () => 
    {
      ref.current?.show();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCloseDialog = () => 
    {
      ref.current?.close();
    };

    return (
      <div>
        <button onClick={handleOpenDialog}>Open Dialog</button>
        <Dialog label={args.label} ref={ref}>
        Мне нужна от Вас справка что я не получал единовременное пособие по рождению ребенка
        </Dialog>
      </div>
    );
  }
};
