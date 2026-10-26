import path from 'node:path';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'src/.eslintrc.ts'),
  context: path.resolve(__dirname, 'src'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['/node_modules/'],
  emitError: true,
  emitWarning: true,
};

const config: webpack.Configuration &  & {
  devServer?: DevServerConfiguration;
} = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [path.resolve(__dirname, 'src/App.tsx')],
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  // Keep your existing module rules and devServer configuration.

  plugins: [new ESLintPlugin(ESLintOptions)],

  devServer: {
    hot: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
  },
};

export default config;
