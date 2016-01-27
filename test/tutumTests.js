'use strict';

const assert = require('assertthat');

const Tutum = require('../lib/tutum');

suite('Tutum', () => {
  test('is a function.', done => {
    assert.that(Tutum).is.ofType('function');
    done();
  });

  test('returns an object.', done => {
    assert.that(new Tutum()).is.ofType('object');
    done();
  });

  test('provides the configuration constiables.', done => {
    const configuration = {
      foo: 'bar'
    };
    const tutum = new Tutum(configuration);

    assert.that(tutum.configuration.baseEndpoint).is.ofType('string');
    assert.that(tutum.configuration.username).is.ofType('string');
    assert.that(tutum.configuration.apiKey).is.ofType('string');
    done();
  });

  test('sets the configuration to the desired values.', done => {
    const configuration = {
      baseEndpoint: 'http://example.com',
      username: 'foo',
      apiKey: 'bar'
    };
    const tutum = new Tutum(configuration);

    assert.that(tutum.configuration.baseEndpoint).is.equalTo(configuration.baseEndpoint);
    assert.that(tutum.configuration.username).is.equalTo(configuration.username);
    assert.that(tutum.configuration.apiKey).is.equalTo(configuration.apiKey);
    done();
  });

  test('calculates the auth string.', done => {
    const configuration = {
      username: 'foo',
      apiKey: 'bar'
    };
    const base64Result = 'Zm9vOmJhcg==';
    const tutum = new Tutum(configuration);

    assert.that(tutum.configuration.authorization).is.equalTo(base64Result);
    done();
  });

  suite('instance', () => {
    let tutum;

    suiteSetup(() => {
      tutum = new Tutum();
    });

    test('request is a function.', done => {
      assert.that(tutum.request).is.ofType('function');
      done();
    });

    test('get is a function.', done => {
      assert.that(tutum.request).is.ofType('function');
      done();
    });

    test('post is a function.', done => {
      assert.that(tutum.request).is.ofType('function');
      done();
    });

    test('patch is a function.', done => {
      assert.that(tutum.request).is.ofType('function');
      done();
    });

    test('delete is a function.', done => {
      assert.that(tutum.request).is.ofType('function');
      done();
    });
  });
});
