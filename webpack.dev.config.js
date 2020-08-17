const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
    mode: "development",

    devtool: 'inline-source-map',

    // devServer: {
    //     hot:true
    // },

    entry: {
        vendor: ["react"], // Third party libraries
        client: ['react-hot-loader/patch', './src/index.js']
    },

    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    }
});