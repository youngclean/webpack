const webpack = require('webpack');
var path = require("path");
var src_path = './src';

var config = {
    entry: {
        app: ['./src/test/index.js']
    },
    output: {
        path: path.resolve(__dirname, "./bin"), //'./bin',
        filename: 'index.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules', 'src/test']
    }
};
module.exports = config;