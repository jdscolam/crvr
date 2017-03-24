const path = require("path");
const { AureliaPlugin } = require("aurelia-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "aurelia-bootstrapper",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",    
    chunkFilename: "[name].js"
  },

  resolve: {
    extensions: [".js"],
    modules: ["src", "node_modules"].map(x => path.resolve(x)),
    alias:{
      '$': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
    }
  },

 devtool: 'eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(js)$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy' ]
        }
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        issuer: /\.html?$/i
      },
      {
        test: /\.css$/i,
        loader: ['style-loader', 'css-loader'],
        issuer: /\.[tj]s$/i
      },
      { test: /\.html$/i, 
        use: "html-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use:"url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" }
    ]
  },  

  plugins: [
    new AureliaPlugin({
      dist: 'es2015'
    }),
    new BabiliPlugin(),
    new HtmlWebpackPlugin({
        template: '!html-webpack-plugin/lib/loader!index.html',
        filename: 'index.html'
    }), 
  ]
};