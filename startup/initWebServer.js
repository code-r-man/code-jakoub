export default (app) => {
  // load port from configs...
  const port = app.get('config').server.port;
  const log = app.get('logs.web');

  // start web server...
  return app.listen(port, (error) => {
    if (error) {
      // log startup error...
      log.error(error);
      return;
    }

    // log startup success...
    log.info('✪  Web Server > Listening on port %s.', port);
  });
};
