import { type Configuration } from 'webpack';
import { type BuildOptions } from './types';

export function buildResolvers(
  options: BuildOptions
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  };
}
