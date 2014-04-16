'use strict';

var assert = require('node-assertthat');

var tutum = require('../lib/tutum');

var credentials = require('./credentials.json');

credentials.fake = {
  username: 'foo',
  apiKey: 'bar'
};

suite('tutum', function () {
  test('is an object.', function () {
    assert.that(tutum, is.ofType('object'));
  });

  suite('authenticate', function () {
    test('is a function.', function () {
      assert.that(tutum.authenticate, is.ofType('function'));
    });

    test('throws an error if options are missing.', function () {
      assert.that(function () {
        tutum.authenticate();
      }, is.throwing('Authentication options are missing.'));
    });

    test('throws an error if options do not contain the username.', function () {
      assert.that(function () {
        tutum.authenticate({
          apiKey: credentials.apiKey
        });
      }, is.throwing('Username is missing.'));
    });

    test('throws an error if options do not contain the API key.', function () {
      assert.that(function () {
        tutum.authenticate({
          username: credentials.username
        });
      }, is.throwing('API key is missing.'));
    });

    test('throws an error if the callback is missing.', function () {
      assert.that(function () {
        tutum.authenticate(credentials);
      }, is.throwing('Callback is missing.'));
    });

    test('returns a reference to the cloud.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(err, is.null());
        assert.that(cloud, is.ofType('object'));
        done();
      });
    });
  });

  suite('getApplications', function () {
    test('is a function.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(cloud.getApplications, is.ofType('function'));
        done();
      });
    });

    test('throws an error is the callback is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.getApplications();
        }, is.throwing('Callback is missing.'));
        done();
      });
    });

    test('returns an error if the credentials are wrong.', function (done) {
      tutum.authenticate(credentials.fake, function (err, cloud) {
        cloud.getApplications(function (err) {
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    test('returns a list of applications.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.getApplications(function (err, applications, metadata) {
          assert.that(err, is.null());
          assert.that(applications, is.ofType('object'));
          assert.that(metadata, is.ofType('object'));
          done();
        });
      });
    });
  });
});
