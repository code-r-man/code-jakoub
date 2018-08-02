import lokkaClientConstructor from 'utils/lokkaClientConstructor';

export default (req, res, next) => {
  const log = req.app.get('logs.web');
  const { proto, host, endpoint } = req.app.get('config').graphql;
  const lokkaUrl = `${proto}://${host}${endpoint}`;

  log.info('MIDDLEWARE: lokkaClient: start...');
  res.locals.lokkaClient = lokkaClientConstructor( // eslint-disable-line
    lokkaUrl,
    { cookie: 'SESSION_ID="testSession"' }
  );
  log.info('MIDDLEWARE: lokkaClient: client created!');
  next();
};
