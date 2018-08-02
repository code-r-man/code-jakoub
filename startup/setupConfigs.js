import _set from 'lodash/set';
import _defaultsDeep from 'lodash/defaultsDeep';
import config from 'config/configDevelop.json';

export default (app) => {
  const envVars = Object.keys(
    process.env
  ).filter(
    // filter out GB variables from environment...
    key => key.match(/^gb2_.*$/)
  ).map(
    // translate variable names to paths of the config object...
    key => ({
      path: key.split('gb2_')[1].split('_').join('.'),
      value: process.env[key],
    })
  ).reduce(
    // create a config object based on the paths...
    (context, envVar) => _set(context, envVar.path, envVar.value),
    {}
  );

  // log envVars if any in use...
  if (Object.keys(envVars).length) {
    console.log('Using Env Vars...', envVars); // eslint-disable-line
  }

  // merge the config objects together, envVars has higher priority...
  // add config data to app instance...
  app.set('config', _defaultsDeep(envVars, config));
};
