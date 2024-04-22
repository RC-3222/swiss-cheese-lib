import type { StorybookConfig } from '@storybook/react-webpack5';

import webpackConfGetter from '../webpack.config.ts';
import { RuleSetRule } from 'webpack';

const customConf = webpackConfGetter({ mode: 'development' });

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules?.filter(
            (rule: any) => !rule?.test?.test('.svg')
          ) as []),
          ...(customConf.module?.rules as [])
        ]
      }
    };
  }
};
export default config;
