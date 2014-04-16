'use strict';

var querystring = require('querystring'),
    util = require('util');

var request = require('superagent');

var tutum = {};

tutum.authenticate = function (credentials, callback) {
  if (!credentials) { throw new Error('Credentials are missing.'); }
  if (!credentials.username) { throw new Error('Username is missing.'); }
  if (!credentials.apiKey) { throw new Error('API key is missing.'); }
  if (!callback) { throw new Error('Callback is missing.'); }

  var cloud = {};

  var sendRequest = function (options, callback) {
    var method = (options.method || 'GET').toLowerCase();

    request
      [method](util.format('https://app.tutum.co%s?%s', options.path, querystring.stringify(options.query)))
      .set('Accept', 'application/json')
      .set('Authorization', util.format('ApiKey %s:%s', credentials.username, credentials.apiKey))
      .end(function (err, res) {
        if (err) { return callback(err); }
        if (res.error) { return callback(res.error); }
        callback(null, res.body);
      });

  };

  cloud.getApplications = function (options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }

    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ path: '/api/v1/application/', query: options }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res.objects, res.meta);
    });
  };

  callback(null, cloud);
};

module.exports = tutum;
