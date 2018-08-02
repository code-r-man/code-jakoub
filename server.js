import express from 'express';
import setupConfigs from 'startup/setupConfigs';
import setupLogs from 'startup/setupLogs';
import applyMiddleware from 'middleware/index';
import initWebServer from 'startup/initWebServer';
import { initGraphQlServer } from 'startup/initGraphQlServer';
import initWebpack from 'startup/initWebpack';

const app = express();

// SETUP: put config file in app memory app.get('config')...
setupConfigs(app);

// SETUP: configure a logger and put it in memory app.get('logs.web') app.get('logs.api')...
setupLogs(app);

// SERVICE: initialize Webpack...
initWebpack(app);

// Service GraphQl
initGraphQlServer(app);

// SERVICE: middlewares... check middleware/index for more info
applyMiddleware(app);

// SERVICE: initialize web service...
initWebServer(app);
