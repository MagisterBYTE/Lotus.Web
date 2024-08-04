import { type StorybookConfig } from '@storybook/react-vite';
import { mergeConfig }  from "vite"
import tsconfigPaths  from 'vite-tsconfig-paths'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: 
    {
      
    }
  },

  viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths(),
      ]
    })
  }
};
export default config;
