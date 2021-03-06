var defaults = require('lodash.defaults');

function createConfig(userConfig) {
  var env = process.env;
  var config = userConfig || {};

  defaults(config, {
    username: env.TUNNELSSH_USER || env.USER || env.USERNAME,
    port: 22,
    srcPort: 0,
    srcHost: '127.0.0.1',
    dstPort: null,
    dstHost: '127.0.0.1',
    host: config.dstHost,
    localHost: '127.0.0.1',
    localPort: null,
    agent: process.env.SSH_AUTH_SOCK
  });

  // No local route, no remote route.. exit here
  if (!config.dstPort || !config.dstHost || !config.host) {
    throw new Error('invalid configuration.');
  }

  // Use the same port number local
  if (config.localPort === null) {
    config.localPort = config.dstPort;
  }
  return config;
};

module.exports = createConfig;
