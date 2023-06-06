const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin


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
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, "src/"),
              outputPath: '/',
              publicPath: '../',
              useRelativePath: true,
            }
          }
        ]
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
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      },
      inject: 'body', // добавляем скрипты в конец body
      // chunksSortMode: 'manual', // указываем порядок добавления скриптов
      // chunks: ['vendors', 'bundle'], // порядок добавления скриптов
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/' + filename('css'),
    }),
   
    new BundleAnalyzerPlugin(),
  ],
}