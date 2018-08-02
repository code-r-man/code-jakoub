import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default (app) => {
  // load webpack configs...
  // eslint-disable-next-line global-require
  const webpackConfig = require('../webpack-client.js');

  // create compiler based on configs...
  const compiler = webpack(webpackConfig);

  // apply dev middleware...
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    stats: webpackConfig.stats,
  }));

  // apply hot reload middleware...
  app.use(webpackHotMiddleware(compiler));
};
