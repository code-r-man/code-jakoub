export default (regexp) => (req, res, next) => {
  const log = req.app.get('logs.web');
  if (regexp.test(req.originalUrl)) {
    log.info('MIDDLEWARE: excludePath: exclude in effect!', req.originalUrl);
  } else {
    next();
  }
};
