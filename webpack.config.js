import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const pages = ["index","create-order", "order-history"]

var config ={}

export default config = {

  entry: pages.reduce((config, page) => {
    config[page] = `./src/scripts/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist")
  },
  devServer: {
    contentBase: './dist'
  },
  stats: {
    warnings: false
  },
  devtool: 'eval-source-map',
  plugins: [].concat(
    pages.map((page) =>
      new HtmlWebpackPlugin({
        inject: true,
        template: `./src/${page}.html`,
        filename: `${page}.html`,
        chunks: [page],
        inject: 'body'

      })
    )
  ),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};