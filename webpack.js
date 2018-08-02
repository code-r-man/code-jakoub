const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// prepare node modules to be defined as external dependencies...
const nodeModules = {};

// we need flexboxgrid as not external because it is used in server side rendering...
const notExternal = ['flexboxgrid'];

fs.readdirSync('node_modules').filter(
  // do not exclude those that are not external...
  (x) => (['.bin'].indexOf(x) === -1 && notExternal.indexOf(x) === -1)
).forEach((mod) => {
  nodeModules[mod] = `commonjs ${mod}`;
});

function exportSettings(consumer, extras) {
  // ensure certain domain for the values...
  consumer = consumer === 'client' ? 'client' : 'server';
  extras = extras || {};

  // babel presets...
  const babelPresets = {
    presets: ['es2015', 'react', 'stage-0', 'stage-2'],
    plugins: ['transform-runtime'],
    sourceMaps: true,
    ignore: [/node_modules/],
  };

  // the target for the webpack build...
  const target = {
    client: 'web',
    server: 'node',
  };

  // define the source map level in webpack...
  const devtool = '#cheap-module-inline-source-map';

  // the entry point of the application...
  const entry = {
    client: ['webpack-hot-middleware/client', './client'],
    server: ['./server'],
  };

  // output paths for the compiled code...
  const output = {
    client: {
      path: './public',
      filename: 'application.js',
      publicPath: '/public/',
    },
    server: {
      path: '/',
      filename: 'compiled-server.js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
  };

  // specific plugins by consumer, common will be concatenated on export to specific plugins...
  const plugins = {
    common: [
      // we always need to setup some globals...
      new webpack.DefinePlugin({
        'ENV.production': false,
        'ENV.browser': consumer === 'client',
      }),

      // this will prevent circular dependencies to include the same module more than once...
      new webpack.optimize.DedupePlugin(),

      // this will make sure the order of inclusion of the modules is the correct one...
      new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    client: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    server: [
      new webpack.BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
      )
    ],
  };

  // specific loaders by consumer, common will be concatenated on export to specific loaders...
  const loaders = {
    common: [{
      // transpile es2015...
      test: /\.js$/,
      loader: 'react-hot!babel',
      exclude: [/node_modules/],
    }, {
      // compress images...
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'url?limit=100000',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ],
    }, {
      test: /.*\.(rsvg)$/i,
      loader: 'babel?presets[]=es2015,presets[]=react!svg-react',
    }, {
      // include json files that are not in the node_modules...
      test: /\.json$/,
      loader: 'json',
    }],
    server: [{
      // compress project less and css, excluding CSS Modules deps,
      // this import will be replaced later on by a noop plugin...
      test: /\.less$/,
      loader: 'css?sourceMap!less?sourceMap',
    }, {
      // we need the class names included from CSS Modules deps
      test: /\.(scss|css)$/,
      loader: 'css/locals?modules&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!sass',
    }],
    client: [{
      // in client side we need to include the styles...
      test: /\.less$/,
      loader: 'style!css?sourceMap!less?sourceMap',
    }, { // specific flow for libs using CSS modules...
      test: /\.(scss|css)$/,
      loader: 'style!css?modules&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!sass',
    }],
  };

  const externals = {
    common: {},
    client: {},
    server: nodeModules,
  };

  const resolve = {
    root: {
      common: [
        path.resolve(process.cwd()),
        path.resolve('./src'),
      ],
      client: {},
      server: {},
    },
    alias: {
      common: {},
      client: {},
      server: {},
    }
  };

  return Object.assign({}, {
    stats: { chunks: false, modules: false, chunkModules: false, colors: true },
    target: target[consumer],
    devtool: devtool,
    debug: true,
    contentBase: output[consumer].publicPath,
    entry: entry[consumer],
    output: {
      path: path.join(__dirname, '', output[consumer].path),
      filename: output[consumer].filename,
      publicPath: output[consumer].publicPath,
      devtoolModuleFilenameTemplate: output[consumer].devtoolModuleFilenameTemplate,
      devtoolFallbackModuleFilenameTemplate: output[consumer].devtoolFallbackModuleFilenameTemplate,
    },
    resolve: {
      alias: Object.assign({}, resolve.alias.common, resolve.alias[consumer]),
      root: [].concat(resolve.root.common || resolve.root, resolve.root[consumer] || []),
    },
    plugins: [].concat(plugins.common || plugins, plugins[consumer] || []),
    module: {
      // preLoaders: [].concat(preLoaders.common || preLoaders, preLoaders[consumer] || []),
      loaders: [].concat(loaders.common || loaders, loaders[consumer] || []),
    },
    sassLoader: {
      data: '@import "' + path.resolve(process.cwd(), './src/App/_theme.scss') + '";'
    },
    babel: babelPresets,
    bail: false,
    externals: Object.assign({}, externals.common, externals[consumer])
  }, extras);
}

// notice this should be an array of webpack configs so webpack can digest them in bundle
module.exports = [
  exportSettings('client'),
  exportSettings('server'),
];
