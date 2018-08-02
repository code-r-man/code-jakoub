import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import graphQlService from 'graphQl/service';
import lokkaClient from 'middleware/lokkaClient';

export const initGraphQlServer = app => {
  console.log('GraphQl server mounted in /graphql'); // eslint-disable-line
  app.all(
    '/graphql',
    bodyParser.json(),
    cookieParser(),
    lokkaClient,
    graphQlService,
  );
};
