'use strict';

var assert = require('assertthat');
var Tutum = require('../lib/tutum');

suite('Tutum', function () {
  test('is a function.', function (done) {
    assert.that(Tutum, is.ofType('function'));
    done();
  });

  test('returns an object.', function (done) {
    assert.that(new Tutum(), is.ofType('object'));
    done();
  });

  test('provides the configuration variables.', function (done) {
    var configuration = {
      foo: 'bar'
    };
    var tutum = new Tutum(configuration);

    assert.that(tutum.configuration.baseEndpoint, is.ofType('string'));
    assert.that(tutum.configuration.username, is.ofType('string'));
    assert.that(tutum.configuration.apiKey, is.ofType('string'));
    done();
  });

  test('sets the configuration to the desired values.', function (done) {
    var configuration = {
      baseEndpoint: 'http://example.com',
      username: 'foo',
      apiKey: 'bar'
    };
    var tutum = new Tutum(configuration);

    assert.that(tutum.configuration.baseEndpoint, is.equalTo(configuration.baseEndpoint));
    assert.that(tutum.configuration.username, is.equalTo(configuration.username));
    assert.that(tutum.configuration.apiKey, is.equalTo(configuration.apiKey));
    done();
  });

  test('calculates the auth string.', function (done) {
    var configuration = {
      username: 'foo',
      apiKey: 'bar'
    };
    var tutum = new Tutum(configuration);

    assert.that(tutum.configuration.authorization, is.equalTo(configuration.username + ':' + configuration.apiKey));
    done();
  });

  suite('instance', function () {
    var tutum;

    suiteSetup(function () {
      tutum = new Tutum();
    });

    test('request is a function.', function (done) {
      assert.that(tutum.request, is.ofType('function'));
      done();
    });

    test('get is a function.', function (done) {
      assert.that(tutum.request, is.ofType('function'));
      done();
    });

    test('post is a function.', function (done) {
      assert.that(tutum.request, is.ofType('function'));
      done();
    });

    test('patch is a function.', function (done) {
      assert.that(tutum.request, is.ofType('function'));
      done();
    });

    test('delete is a function.', function (done) {
      assert.that(tutum.request, is.ofType('function'));
      done();
    });
  });
});
