import manifest from "../dist/asset-manifest.json";

export default async (req, res) => {
    /**
       * A simple helper function to prepare the HTML markup. This loads:
       * - Page title
       * - SEO meta tags
       * - Preloaded state (for Redux) depending on the current route
       * - Code-split script tags depending on the current route
       */
    const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
        // data = data.replace(
        //     "<html>",
        //     `<html ${html}>`
        // );
        // data = data.replace(
        //     /<title>.*?<\/title>/g,
        //     title
        // );
        // data = data.replace(
        //     "</head>",
        //     `${meta}</head>`
        // );
        data = data.replace(
            '<div id="root"></div>',
            `<div id="root">${body}</div>` // <script>window.__PRELOADED_STATE__ = ${state}</script>`
        );
        data = data.replace(
            "</body>",
            scripts.join("") + "</body>"
        );
        return data;
    };

    const context = {};
    const indexFile = path.resolve('./public/index.html');

    fs.readFile(
        indexFile,
        'utf8',
        (err, data) => {
            if (err) {
                console.error('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }

            // If context has a url property, then we need to handle a redirection in Redux Router
            if (context.url) {
                return res.redirect(301, context.url);
            }

            const app = ReactDOMServer.renderToString(
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            );

            const modules = [];

            // Let's give ourself a function to load all our page-specific JS assets for code splitting
            const extractAssets = (assets, chunks) =>
                Object.keys(assets)
                    .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
                    .map(k => assets[k]);

            // Let's format those assets into pretty <script> tags
            const extraChunks = extractAssets(manifest, modules).map(
                c =>
                    `<script type="text/javascript" src="/${c.replace(
                        /^\//,
                        ""
                    )}"></script>`
            );

            // Pass all this nonsense into our HTML formatting function above
            const html = injectHTML(htmlData, {
                // html: helmet.htmlAttributes.toString(),
                // title: helmet.title.toString(),
                // meta: helmet.meta.toString(),
                body: app,
                scripts: extraChunks,
                // state: JSON.stringify(store.getState()).replace(/</g, "\\u003c")
            });

            // We have all the final HTML, let's send it to the user already!
            return res.send(html);
        }
    );
}