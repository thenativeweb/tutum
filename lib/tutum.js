'use strict';

var request = require('superagent');

var tutum = {};

tutum.authenticate = function (options, callback) {
  if (!options) { throw new Error('Authentication options are missing.'); }
  if (!options.username) { throw new Error('Username is missing.'); }
  if (!options.apiKey) { throw new Error('API key is missing.'); }
  if (!callback) { throw new Error('Callback is missing.'); }

  var cloud = {};

  var sendRequest = function (requestOptions, callback) {
    var method = (requestOptions.method || 'GET').toLowerCase();

    request
      [method]('https://app.tutum.co' + requestOptions.path)
      .set('Accept', 'application/json')
      .set('Authorization', 'ApiKey ' + options.username + ':' + options.apiKey)
      .end(function (err, res) {
        if (err) { return callback(err); }
        if (res.error) { return callback(res.error); }
        callback(null, res.body);
      });

  };

  cloud.getApplications = function (callback) {
    if (!callback) { throw new Error('Callback is missing.'); }
    sendRequest({ path: '/api/v1/application/' }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res.objects, res.meta);
    });
  };

  callback(null, cloud);
};

module.exports = tutum;
