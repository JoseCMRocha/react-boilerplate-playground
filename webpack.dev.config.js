const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: "development",

    devtool: 'inline-source-map',

    plugins: [
        // delete this
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        new CleanWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            filename: 'public/index.html',
            template: path.resolve(__dirname, 'public/index.html')
        }),        
    ],

    entry: {
        client: ['react-hot-loader/patch', './src/index.js']
    },

    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    }
});