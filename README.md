# tutum

tutum is a wrapper around Tutum's API for Node.js.

## Installation

    $ npm install tutum

## Quick start

First you need to add a reference to tutum in your application.

```javascript
var Tutum = require('tutum');
```

Then, you need to call the `Tutum` constructor function to create a new instance. For that you need to specify your username and your API key. For details on where to get them, see the [Tutum documentation](https://docs.tutum.co/v2/api).

```javascript

var tutum = new Tutum({
  username: '...',
  apiKey: '...'
});
```

Now you can perform `GET`, `POST`, `PATCH` and `DELETE` requests against the Tutum API using the following helper functions.

```javascript
tutum.get(path, options, function (err, res) {
  // ...
});

tutum.post(path, options, function (err, res) {
  // ...
});

tutum.patch(path, options, function (err, res) {
  // ...
});

tutum.delete(path, options, function (err, res) {
  // ...
});
```

Refer to the [Tutum documentation](https://docs.tutum.co/v2/api/) to find the appropriate method and path for your request. The following two samples basically show how to use the API.

```javascript
// List all successful actions (https://docs.tutum.co/v2/api/#list-all-actions)
tutum.get('/action', { state: 'Success' }, function (err, res) {
  // ...
});

// Start a container (https://docs.tutum.co/v2/api/#start-a-container)
tutum.post('/container/[UUID]/start', function(err, res) {
  // ...
});
```

Please also have a look at the [examples folder](https://github.com/goloroden/tutum/tree/master/examples) for a real-world example.

## Running the tests

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://jshint.com/). To run Grunt, go to the folder where you have installed tutum and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014-2015 Golo Roden.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
