const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  // devtool: 'eval',
  entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    // 'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.tsx')
  ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        modules: ['src', 'node_modules']
    },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        // the client needs `css-modules-transform` removed from the babelrc
        // since `ExtractCssChunks` handles css transformation:
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2017', 'react', 'stage-0'],
            plugins: [] // notice 'css-modules-transform' is not here
          }
        }
      },
        {
        // the client needs `css-modules-transform` removed from the babelrc
        // since `ExtractCssChunks` handles css transformation:
        test: /\.tsx?$/,
        exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: {
                  babelrc: false,
                  presets: ['es2017', 'react', 'stage-0'],
                  plugins: [] // notice 'css-modules-transform' is not here
              }
          }, 'awesome-typescript-loader']
        },
        {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        })
      }
    ]
  },
  plugins: [
    new ExtractCssChunks(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
    //   filename: '[name].js',
    //   minChunks: Infinity
    // }),

    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
