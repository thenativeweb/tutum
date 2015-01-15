'use strict';

var assert = require('node-assertthat');
var Tutum = require('../lib/tutum');

suite('Tutum', function(){

  suite('constructor', function(){

    test('is a function', function(){
      assert.that(Tutum, is.ofType('function'));
    });

    test('instance is object', function(){
      assert.that(new Tutum(), is.ofType('object'));
    });

    test('required configuration is present', function(){
      var config = {
        foo: 'bar'
      };
      var instance = new Tutum(config);

      assert.that(instance.config.baseEndpoint, is.ofType('string'));
      assert.that(instance.config.username, is.ofType('string'));
      assert.that(instance.config.apiKey, is.ofType('string'));
    });

    test('configuration is extended', function(){
      var config = {
        baseEndpoint: 'http://example.com',
        username: 'foo',
        apiKey: 'bar'
      };
      var instance = new Tutum(config);

      assert.that(instance.config.baseEndpoint, is.equalTo(config.baseEndpoint));
      assert.that(instance.config.username, is.equalTo(config.username));
      assert.that(instance.config.apiKey, is.equalTo(config.apiKey));
    });

    test('authorization string is built', function(){
      var config = {
        username: 'foo',
        apiKey: 'bar'
      };
      var instance = new Tutum(config);

      assert.that(
        instance.config.authorization,
        is.equalTo(config.username + ':' + config.apiKey)
      );
    });

  });

  suite('instance methods', function(){
    var instance = new Tutum();
    test('instance.request is a function', function(){
      assert.that(instance.request, is.ofType('function'));
    });

    test('instance.get is a function', function(){
      assert.that(instance.request, is.ofType('function'));
    });

    test('instance.post is a function', function(){
      assert.that(instance.request, is.ofType('function'));
    });

    test('instance.patch is a function', function(){
      assert.that(instance.request, is.ofType('function'));
    });

    test('instance.delete is a function', function(){
      assert.that(instance.request, is.ofType('function'));
    });
  });

});
