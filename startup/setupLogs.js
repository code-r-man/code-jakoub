export default (app) => {
  app.set('logs.web', console);
  app.set('logs.api', console);
};

