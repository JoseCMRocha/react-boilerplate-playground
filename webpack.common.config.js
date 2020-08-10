const path = require('path');

module.exports = {
    output: {
        // the output bundle
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/', // '/dist/'
    },

    resolve: { extensions: ["*", ".js", ".jsx"] },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                // options: { presets: ["@babel/env"] }
            }
        ],
    },
};