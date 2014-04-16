'use strict';

var tutum = {};

tutum.authenticate = function (options) {
  if (!options) { throw new Error('Authentication options are missing.'); }
  if (!options.username) { throw new Error('Username is missing.'); }
  if (!options.apiKey) { throw new Error('API key is missing.'); }

  var session = {};

  return session;
};

module.exports = tutum;
