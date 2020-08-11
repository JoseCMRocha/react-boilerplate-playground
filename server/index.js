import path from 'path';
import express from 'express';

import router from './router';

console.log("-- Initing Express app --");

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

if (process.env.NODE_ENV === 'development') {

    console.log("-- Initing hmr in development mode --");
    
    const webpackConfig = require('../webpack.server.hmr.config');
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
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

} else if(process.env.NODE_ENV === 'production') {
	//app.use(express.static(path.resolve(__dirname, 'dist')));
}

app.get('*', router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
