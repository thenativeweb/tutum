'use strict';

var assert = require('node-assertthat');

var tutum = require('../lib/tutum');

var credentials = require('./credentials.json');

credentials.fake = {
  username: 'foo',
  apiKey: 'bar'
};

suite('tutum', function () {
  this.timeout(30 * 1000);

  test('is an object.', function () {
    assert.that(tutum, is.ofType('object'));
  });

  suite('authenticate', function () {
    test('is a function.', function () {
      assert.that(tutum.authenticate, is.ofType('function'));
    });

    test('throws an error if the credentials are missing.', function () {
      assert.that(function () {
        tutum.authenticate();
      }, is.throwing('Credentials are missing.'));
    });

    test('throws an error if the credentials do not contain the username.', function () {
      assert.that(function () {
        tutum.authenticate({
          apiKey: credentials.apiKey
        });
      }, is.throwing('Username is missing.'));
    });

    test('throws an error if the credentials do not contain the API key.', function () {
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

    test('respects query criteria.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.getApplications({ limit: 10 }, function (err, applications, metadata) {
          assert.that(err, is.null());
          assert.that(applications, is.ofType('object'));
          assert.that(metadata, is.ofType('object'));
          done();
        });
      });
    });
  });

  suite('getApplicationDetails', function () {
    test('is a function.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(cloud.getApplicationDetails, is.ofType('function'));
        done();
      });
    });

    test('throws an error if the application id is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.getApplicationDetails();
        }, is.throwing('Application id is missing.'));
        done();
      });
    });

    test('throws an error if the callback is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.getApplicationDetails('foo');
        }, is.throwing('Callback is missing.'));
        done();
      });
    });

    test('returns an error if the credentials are wrong.', function (done) {
      tutum.authenticate(credentials.fake, function (err, cloud) {
        cloud.getApplicationDetails('foo', function (err) {
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    test('returns an error if the application id does not exist.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.getApplicationDetails('foo', function (err) {
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    // Basically, the test works, but it is delayed until an app can be created
    // and deleted programmatically.
    test.skip('returns the application details.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.getApplicationDetails('', function (err, details) {
          assert.that(err, is.null());
          assert.that(details, is.ofType('object'));
          done();
        });
      });
    });
  });

  suite('createApplication', function () {
    test('is a function.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(cloud.createApplication, is.ofType('function'));
        done();
      });
    });

    test('throws an error if the options are missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.createApplication();
        }, is.throwing('Options are missing.'));
        done();
      });
    });

    test('throws an error if the image is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.createApplication({});
        }, is.throwing('Image is missing.'));
        done();
      });
    });

    test('throws an error if the callback is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.createApplication({ image: 'tutum/hello-world' });
        }, is.throwing('Callback is missing.'));
        done();
      });
    });

    test('returns an error if the credentials are wrong.', function (done) {
      tutum.authenticate(credentials.fake, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err) {
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    // Basically, the test works, but it is delayed until an app can be deleted
    // programmatically.
    test.skip('returns the details of the created application.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err, details) {
          assert.that(err, is.null());
          assert.that(details, is.ofType('object'));
          done();
        });
      });
    });
  });
});
