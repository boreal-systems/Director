const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './ui/src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name (file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]'
            }

            return '[contenthash].[ext]'
          }
        }
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'ui/dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'ui/public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}