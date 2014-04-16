'use strict';

var assert = require('node-assertthat');

var tutum = require('../lib/tutum');

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
          apiKey: 'bar'
        });
      }, is.throwing('Username is missing.'));
    });

    test('throws an error if options do not contain the API key.', function () {
      assert.that(function () {
        tutum.authenticate({
          username: 'foo'
        });
      }, is.throwing('API key is missing.'));
    });

    test('returns a session object.', function () {
      var session = tutum.authenticate({ username: 'foo', apiKey: 'bar' });
      assert.that(session, is.ofType('object'));
    });
  });
});
