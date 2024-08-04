import type { Preview } from '@storybook/react';
//import { ThemeProvider } from '../src/app/theme';

import "../src/app/styles/index"

document.documentElement.setAttribute('data-theme', 'light');

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;