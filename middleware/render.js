import { renderToString } from 'react-dom/server';
import configureStore from 'redux/configureStore';
import routes from 'config/routes';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';

const renderFullPage = (html, initialState) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Gamebook Portal</title>
       <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,300,500">
       <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css">
    </head>
    <body>
      <div class="gamebook-portal" id="root">${html}</div>
      <div id="devtools"></div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/public/application.js"></script>
    </body>
  </html>
`;

export default function (req, res, next) {
  const history = createMemoryHistory();
  const log = req.app.get('logs.web');
  log.info('MIDDLEWARE: render: ', req.url);

  // check if the requested url is defined as a valid route path...
  match(
    { history, routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      // if there was an error send proper error code...
      if (error) {
        // log and fulfill request...
        // todo: create error abstraction - redirect to a proper 500 page?
        log.error('500', req.url, error.message, error.stack);
        res.status(500).send(error.message);
        next();
        return;
      }

      // if is a redirection send the proper redirection code...
      if (redirectLocation) {
        // log and fulfill request...
        log.info(
          'MIDDLEWARE: render: status 302',
          req.url,
          redirectLocation,
          redirectLocation.pathname + redirectLocation.search
        );
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        next();
        return;
      }

      // if everything was okay send the render the page normally...
      if (renderProps) {
        // todo: implement query resolution server side...

        // create a new Redux store instance...
        const store = configureStore({
          // setup configs in the initial state...
          config: req.app.get('config').public,
        }, false);

        // grab the initial state from our Redux store...
        const initialState = store.getState();

        // render the page to a string...
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>);

        // log and fulfill request...
        log.info('MIDDLEWARE: render: status 200', req.url);
        res.status(200).send(renderFullPage(html, initialState));
        next();
        return;
      }

      // if we reach this point is a 404...
      // log and fulfill request...
      // todo: create error abstraction - redirect to a proper 404 page or use reverse proxy?
      log.error('MIDDLEWARE: render: status 404', req.url);
      res.status(404).send('Page Not Found');
      next();
    }
  );
}
