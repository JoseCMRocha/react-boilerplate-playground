const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: "development",

    // node: {
    //     fs: "empty"
    //  },

    target: "node",

    externals: [nodeExternals()],

    //devtool: 'inline-source-map',

    // devServer: {
    //     hot: true
    // },

    output: {
        filename: '[name].js',
        hotUpdateChunkFilename: '.hot/hot-update.js',
        hotUpdateMainFilename: '.hot/hot-update.json',
    },

    entry: [
        'querystring',
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for hot reloading
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './server/index.js'
    ],
    
    plugins: [
        new CleanWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            filename: 'public/index.html',
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        // new webpack.NamedModulesPlugin(),
        // do not emit compiled assets that include errors
        new webpack.NoEmitOnErrorsPlugin(),
    ]
});
