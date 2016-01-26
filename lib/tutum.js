'use strict';

var querystring = require('querystring'),
    util = require('util');

var request = require('superagent');

var Tutum = function (configuration) {
  var defaults = {
    baseEndpoint: 'https://dashboard.tutum.co/api/v1',
    username: '',
    apiKey: ''
  };

  /*eslint-disable no-underscore-dangle*/
  this.configuration = util._extend(defaults, configuration);
  /*eslint-enable no-underscore-dangle*/
  this.configuration.authorization = new Buffer(this.configuration.username + ':' + this.configuration.apiKey).toString('base64');

  this.request = function (method, path, params, callback) {
    var body = {};

    var url = this.configuration.baseEndpoint;

    // Add leading and trailing slashes to the path if they do not exist
    url += path.replace(/^\/?/, '/').replace(/\/?$/, '/');

    callback = (typeof params === 'function') ? params : callback;

    method = method.toLowerCase();
    method = (method === 'delete') ? 'del' : method;

    if (method === 'post' || method === 'patch') {
      body = params;
    } else {
      url += '?' + querystring.stringify(params);
    }

    request
      [method](url)
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + this.configuration.authorization)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        if (err) {
          return callback(err);
        }
        if (res.error) {
          return callback(res.error);
        }
        callback(null, res.body);
      });
  };
};

// Helper instance methods for get, post, patch and delete
[ 'get', 'post', 'patch', 'delete' ].forEach(function (method) {
  Tutum.prototype[method] = function (path, params, callback) {
    this.request(method, path, params, callback);
  };
});

module.exports = Tutum;
