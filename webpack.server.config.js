const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(commonConfig, {
    mode: "development",

    target: "node",
    
    externals: [nodeExternals()],

    devtool: 'inline-source-map',

    entry: {
        server: './server/index.js'
    }
});