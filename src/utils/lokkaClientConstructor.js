import { Lokka } from 'lokka';
const LokkaHttp = require('lokka-transport-http').Transport;

export default (url, headers = {}) => new Lokka({
  transport: new LokkaHttp(url, { headers }),
});
