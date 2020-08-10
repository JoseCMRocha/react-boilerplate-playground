const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
    mode: "development",

    devtool: 'inline-source-map',

    entry: {
        client: './src/index.js'
    },

});