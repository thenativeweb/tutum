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
    if (method === 'delete') { method = 'del'; }

    request
      [method](util.format('https://app.tutum.co%s?%s', options.path, querystring.stringify(options.query)))
      .send(options.data || {})
      .set('Accept', 'application/json')
      .set('Authorization', util.format('ApiKey %s:%s', credentials.username, credentials.apiKey))
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        if (err) { return callback(err); }
        if (res.error) { return callback(res.error); }
        callback(null, res.body);
      });

  };

  cloud.getApplicationDetails = function (applicationId, callback) {
    if (!applicationId) { throw new Error('Application id is missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ path: util.format('/api/v1/application/%s/', applicationId) }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
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

  cloud.createApplication = function (options, callback) {
    if (!options) { throw new Error('Options are missing.'); }
    if (!options.image) { throw new Error('Image is missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ method: 'POST', path: '/api/v1/application/', data: options }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
    });
  };

  cloud.updateApplication = function (applicationId, options, callback) {
    if (!applicationId) { throw new Error('Application id is missing.'); }
    if (!options) { throw new Error('Options are missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ method: 'PATCH', path: util.format('/api/v1/application/%s/', applicationId), data: options }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
    });
  };

  cloud.startApplication = function (applicationId, callback) {
    if (!applicationId) { throw new Error('Application id is missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ method: 'POST', path: util.format('/api/v1/application/%s/start/', applicationId) }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
    });
  };

  cloud.stopApplication = function (applicationId, callback) {
    if (!applicationId) { throw new Error('Application id is missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ method: 'POST', path: util.format('/api/v1/application/%s/stop/', applicationId) }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
    });
  };

  cloud.terminateApplication = function (applicationId, callback) {
    if (!applicationId) { throw new Error('Application id is missing.'); }
    if (!callback) { throw new Error('Callback is missing.'); }

    sendRequest({ method: 'DELETE', path: util.format('/api/v1/application/%s/', applicationId) }, function (err, res) {
      if (err) { return callback(err); }
      return callback(null, res);
    });
  };

  callback(null, cloud);
};

module.exports = tutum;
