import { CONFIG_SET } from 'redux/actionTypes';

// add settings to the config...
export function setConfig(config) {
  return { type: CONFIG_SET, config };
}
