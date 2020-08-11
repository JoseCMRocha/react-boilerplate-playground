const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(commonConfig, {
    mode: "development",

    target: "node",

    externals: [nodeExternals()],

    devtool: 'inline-source-map',

    // devServer: {
    //     hot: true
    // },

    entry: [
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for hot reloading
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        './server/index.js'
    ],

    plugins: [
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        // new webpack.NamedModulesPlugin(),
        // do not emit compiled assets that include errors
        new webpack.NoEmitOnErrorsPlugin(),
    ]
});
