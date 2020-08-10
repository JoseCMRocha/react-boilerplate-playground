import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import routes from '../src/routes';

import App from '../src/App';

export default function router(req, res){
    const match = routes.reduce((acc, route) => matchPath(req.url, {path : route.path, exact: route.exact }) || acc, null);

    if (! match ){
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

        if (context.status === 404) {
            res.status(404);
        }

        if (context.url) {
            return res.redirect(301, context.url);
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });

}