import path from 'path';
import express from 'express';
import compression from "compression";

import router from './router';

console.log("-- Initing Express app --");

const PORT = process.env.PORT || 3006;
const app = express();


// Middleware
app.use(compression());
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../dist')));

if (process.env.NODE_ENV === 'development') {

    console.log("-- Initing hmr in development mode --");

    const webpackConfig = require('../webpack.server.hmr.config');
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        // serverSideRender: true,
        hot: true,
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        // stats: {
        //     assets: false,
        //     colors: true,
        //     version: false,
        //     hash: false,
        //     timings: false,
        //     chunks: false,
        //     chunkModules: false
        // }
    }));
    app.use(require('webpack-hot-middleware')(compiler));

    //app.use(express.static(path.resolve(__dirname, 'src')));

} else if (process.env.NODE_ENV === 'production') {
    //app.use(express.static(path.resolve(__dirname, 'dist')));
    
}

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

