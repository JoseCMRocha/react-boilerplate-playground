import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import express from "express";

import routes from '../src/routes.js';
// import { loader } from  './loader';
import App from '../src/App';

const router = express.Router();
// const router2 = express.Router();
// router2.get('*', loader);
router.get('*', async (req, res) => {

    //const stats = res.locals.webpackStats.toJson()

    // console.log(stats);

    const match = routes.reduce((acc, route) => matchPath(req.url, { path: route.path, exact: route.exact }) || acc, null);

    if (!match) {
        return res.status(404).send("Not the page your are looking for!");
    }

    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const indexFile = path.resolve('./public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        if (context.url) {
            return res.redirect(301, context.url);
        }

        // const getScripts = assets => {
        //     const js = assets.filter(path => path.endsWith('.js'))
        //     const scripts = js.map(path => `<script src="${path}"></script>`)
        //     return scripts.join('\n')
        // }

        // const normalizeAssets = assets => {
        //     return Array.isArray(assets) ? assets : [assets]
        // }

        // const stats = res.locals.webpackStats.toJson();
        // const assets = normalizeAssets(stats.assetsByChunkName.main);

        // const scripts = getScripts(assets);

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${app}</div>`)
        );
    });

});

export default router;