import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/app/theme';
import React from 'react';
import "../src/app/styles/index";

document.documentElement.setAttribute('data-theme', 'light');

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    (Story, { parameters }) => {
      const { pageLayout } = parameters;
      switch (pageLayout) {
        case 'page':
          return (
            <ThemeProvider><Story /></ThemeProvider>
          );
        case 'page-mobile':
          return (
            <ThemeProvider><Story /></ThemeProvider>
          );
        default:
          return <ThemeProvider><Story /></ThemeProvider>;
      }
    },
  ],
};

export default preview;