import graphQLHTTP from 'express-graphql';
import schema from 'graphQl/schema';

// dev settings, only applied if not production...
const devSettings = ENV.production === true ? {} : {
  pretty: true,
  graphiql: true,
};

export default graphQLHTTP(req => {
  req.app.get('logs.api').info('MIDDLEWARE: graphQlService: start...');
  return {
    // define the schema...
    schema,

    // we need to enable some debugging for the endpoint...
    ...devSettings,
  };
});
