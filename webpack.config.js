const path = require('path')

module.exports = {
  entry: './src/ui/index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            '@babel/react'
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/ui'),
    publicPath: './dist/ui',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/src/ui/public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/gql': 'http://localhost:3001/'
    }
  }
}
