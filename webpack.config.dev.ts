import path from 'node:path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type WebpackConfig = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'src/.eslintrc.ts'),
  context: path.resolve(__dirname, 'src'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['node_modules'],
  emitError: true,
  emitWarning: true,
};

const config: WebpackConfig = {
  mode: 'development',

  devtool: 'source-map',

  // Disable Webpack's experimental TypeScript handling
  experiments: {
    typescript: false,
  },

  // React application entry point
  entry: {
    app: path.resolve(__dirname, 'src/App.tsx'),
  },

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
    clean: false,
    publicPath: '/',
  },

  // Resolve TypeScript and JavaScript imports
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  // Module loaders
  module: {
    rules: [
      // TypeScript and React TSX
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },

      // JavaScript and React JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc'),
          },
        },
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin'],
              },
            },
          },
        ],
      },

      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Webpack Dev Server
  devServer: {
    hot: true,

    static: {
      directory: path.resolve(__dirname, 'public'),
    },

    historyApiFallback: true,

    compress: true,

    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  // Webpack plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),

    new ESLintPlugin(ESLintOptions),
  ],

  // Development optimizations
  optimization: {
    minimize: false,
  },

  // Build output
  stats: 'normal',
};

export default config;
