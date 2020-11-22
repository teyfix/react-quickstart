import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import stripJsonComments from 'strip-json-comments';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import YAML from 'yaml';
import resolveOptions from './util/resolve-options';

const BASE = __dirname;
const DIST = join(BASE, 'dist');
const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.css',
  '.scss',
  '.sass',
];

const config: Configuration &
  Required<Pick<Configuration, 'output' | 'plugins'>> = {
  context: BASE,
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: DIST,
    filename: 'app.[contenthash].js',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions,
    plugins: [new TsConfigPathsPlugin({ extensions })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.(mustache|html?)$/i,
        use: resolveOptions(
          'mustache-loader',
          { ext: ['yml', 'yaml'], parser: YAML.parse },
          { ext: ['json', 'jsonc'], parser: [stripJsonComments, JSON.parse] },
        ),
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: DIST,
    port: 8000,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.mustache',
      inject: 'body',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/**/*.mustache', to: '[name].html' }],
    }),
  ],
};

switch (process.env.NODE_ENV) {
  case 'prod':
    config.mode = 'production';
    config.devtool = false;
    // config.devtool = 'source-map';
    break;

  case 'dev':
    config.plugins.push(
      new HotModuleReplacementPlugin(), //
    );
    break;

  default:
    if (null == process.env.NODE_ENV) {
      throw new Error('[NODE_ENV] Environment not defined');
    }

    throw new Error(`[NODE_ENV] Unknown environment "${process.env.NODE_ENV}"`);
}

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

export default config;
