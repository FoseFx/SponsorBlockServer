const getIP = require('../utils/getIP.js');
const getHash = require('../utils/getHash.js');
const rateLimit = require('express-rate-limit');

module.exports = (limitConfig) => rateLimit({
  windowMs: limitConfig.windowMs,
  max: limitConfig.max,
  message: limitConfig.message,
  statusCode: limitConfig.statusCode,
  headers: false,
  keyGenerator: (req /*, res*/) => {
    return getHash(getIP(req), 1);
  },
  skip: (/*req, res*/) => {
    // skip rate limit if running in test mode
    return process.env.npm_lifecycle_script === 'node test.js';
  }
});
