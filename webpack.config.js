const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.env.NODE_ENV === 'production';
const mode = prod ? 'production' : 'development';
const devtool = prod ? 'eval-cheap-source-map' : 'eval-source-map';

module.exports = {
  mode,
  entry: {
    app: './src/client.js'
  },
  devtool,
  // determines the name and place for your output bundles
  output: {
    filename: 'assets/main.[contenthash].js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  plugins: [
    // deletes the public folder for fresh builds
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      title: 'Guacchain',
      filename: 'index.html',
      favicon: './src/favicon.ico'
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\*.js/]),
    new AssetsPlugin({
      filename: 'public/webpackAssets.json'
    }),
    new MiniCssExtractPlugin()
  ],
  // sets rules for processing different files being 'imported'
  // (or loaded) into js files
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // uses .babelrc as config
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
