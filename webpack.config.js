const webpack = require('webpack');
var path = require("path");
module.exports = {
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
        }]
    }
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ]
}