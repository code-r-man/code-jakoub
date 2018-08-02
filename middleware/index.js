import cookieParser from 'cookie-parser';
import lokkaClient from './lokkaClient';
import render from './render';
import bodyParser from 'body-parser';
import excludePath from './excludePath';
import express from 'express';

export default function applyMiddleware(app) {
  // define public folder...
  app.use('/public', express.static('./public'));

  // web rendering...
  app.get(
    '*',
    excludePath(/^\/(graphql|export|tts|file|admin)/),
    bodyParser.json(),
    cookieParser(),
    lokkaClient,
    render // render react application server side...
  );
}
