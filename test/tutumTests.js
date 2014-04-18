'use strict';

var assert = require('node-assertthat');

var tutum = require('../lib/tutum');

var credentials = require('./credentials.json');

var timeoutBetweenCalls = 30 * 1000,
    timeoutForTests = 4 * 60 * 1000;

credentials.fake = {
  username: 'foo',
  apiKey: 'bar'
};

suite('tutum', function () {
  this.timeout(timeoutForTests);

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

    test('returns the application details.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err, detailsCreated) {
          setTimeout(function () {
            cloud.getApplicationDetails(detailsCreated.uuid, function (err, details) {
              assert.that(err, is.null());
              assert.that(details, is.ofType('object'));
              setTimeout(function () {
                cloud.terminateApplication(detailsCreated.uuid, done);
              }, timeoutBetweenCalls);
            });
          }, timeoutBetweenCalls);
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

    test('returns the details of the created application.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err, details) {
          assert.that(err, is.null());
          assert.that(details, is.ofType('object'));
          setTimeout(function () {
            cloud.terminateApplication(details.uuid, done);
          }, timeoutBetweenCalls);
        });
      });
    });
  });

  suite('updateApplication', function () {
    test('is a function.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(cloud.updateApplication, is.ofType('function'));
        done();
      });
    });

    test('throws an error if the application id is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.updateApplication();
        }, is.throwing('Application id is missing.'));
        done();
      });
    });

    test('throws an error if the options are missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.updateApplication('foo');
        }, is.throwing('Options are missing.'));
        done();
      });
    });

    test('throws an error if the callback is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          /*jshint -W106 */
          cloud.updateApplication('foo', { target_num_containers: 2 });
          /*jshint +W106 */
        }, is.throwing('Callback is missing.'));
        done();
      });
    });

    test('returns an error if the credentials are wrong.', function (done) {
      tutum.authenticate(credentials.fake, function (err, cloud) {
        /*jshint -W106 */
        cloud.updateApplication('foo', { target_num_containers: 2 }, function (err) {
          /*jshint +W106 */
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    test('returns the details of the updated application.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err, detailsCreated) {
          setTimeout(function () {
            /*jshint -W106 */
            cloud.updateApplication(detailsCreated.uuid, { target_num_containers: 2 }, function (err, detailsUpdated) {
              /*jshint +W106 */
              assert.that(err, is.null());
              assert.that(detailsUpdated, is.ofType('object'));
              setTimeout(function () {
                cloud.terminateApplication(detailsCreated.uuid, done);
              }, timeoutBetweenCalls);
            });
          }, timeoutBetweenCalls);
        });
      });
    });
  });

  suite('startApplication', function () {
  });

  suite('stopApplication', function () {
  });

  suite('terminateApplication', function () {
    test('is a function.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(cloud.terminateApplication, is.ofType('function'));
        done();
      });
    });

    test('throws an error if the application id is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.terminateApplication();
        }, is.throwing('Application id is missing.'));
        done();
      });
    });

    test('throws an error if the callback is missing.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        assert.that(function () {
          cloud.terminateApplication('foo');
        }, is.throwing('Callback is missing.'));
        done();
      });
    });

    test('returns an error if the credentials are wrong.', function (done) {
      tutum.authenticate(credentials.fake, function (err, cloud) {
        cloud.terminateApplication('foo', function (err) {
          assert.that(err, is.not.null());
          done();
        });
      });
    });

    test('returns the details of the terminated application.', function (done) {
      tutum.authenticate(credentials, function (err, cloud) {
        cloud.createApplication({ image: 'tutum/hello-world' }, function (err, detailsCreated) {
          setTimeout(function () {
            cloud.terminateApplication(detailsCreated.uuid, function (err, detailsTerminated) {
              assert.that(err, is.null());
              assert.that(detailsTerminated, is.ofType('object'));
              done();
            });
          }, timeoutBetweenCalls);
        });
      });
    });
  });
});
