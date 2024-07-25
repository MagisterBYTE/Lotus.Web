import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dialog, IDialogComponent } from './Dialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   : { control: 'color' }
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { : fn() }
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Button'
  }
};

// Компонент с кнопкой и диалогом
const DialogWithButton: React.FC = () => 
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
      <Dialog label='Оваываыв ываыва  ываыва ываыва ывавыаыва ываыв' ref={ref}>
        Б/фывфывы ыфвфывфы выфыв выфыввфвфы фывфыв фв фывфыв ывфыв ыфуйцуувйцлуо уоуй </Dialog>
    </div>
  );
};

// Пример истории с компонентом, включающим кнопку и диалог
export const DialogTriggeredByButton: React.FC = () => <DialogWithButton />;
