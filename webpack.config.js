path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `[name].bundle.${ext}` : `./${ext}/[name].[hash].bundle.${ext}`;
module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/assets/js/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[contenthash].main.js',
    filename: 'assets/'+ filename('js').replace('bundle', 'main'),
    clean: true,
    assetModuleFilename: 'images/[name][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(
        {
          terserOptions: {
              format: {
                  comments: false,
              },
          },
          extractComments: false,
        }
      ),
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
            {
              loader: "ejs-webpack-loader",
            }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets/images'), to: path.resolve(__dirname, 'dist/assets/images') }
      ]
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: { // не конфликтует с минификацией на основе опций "minimize", можно довнести дополнительно какие-то настройки
        removeComments: isProd,
        collapseWhitespace: isProd
      },
      inject: 'body', // добавляем скрипты в конец body
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/' + filename('css').replace('bundle', 'main'),
    }),

  ],
}