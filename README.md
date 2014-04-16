# tutum-node

tutum-node is a wrapper around Tutum's API for Node.js.

## Installation

    $ npm install tutum-node

## Quick start

The first thing you need to do is to integrate tutum-node in your application.

```javascript
var tutum = require('tutum');
```

Then you need to authenticate using your username and your API key. See the [Tutum documentation](http://docs.tutum.co/) if you don't know how to get that key.

```javascript
tutum.authenticate({ username: 'foo', apiKey: 'bar' }, function (err, cloud) {
  // ...
});
```

The `cloud` object that is returned then gives you access to all of Tutum's functionality.

### Applications

#### Getting a list of applications

To get a list of applications, call the `getApplications` function.

```javascript
cloud.getApplications(function (err, applications, metadata) {
  // ...
});
```

## Running the tests

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://jshint.com/). To run Grunt, go to the folder where you have installed tutum-node and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt
