# tutum

[![wercker status](https://app.wercker.com/status/06ef9657d0cf0423d2c6123b964e39f3/s "wercker status")](https://app.wercker.com/project/bykey/06ef9657d0cf0423d2c6123b964e39f3)

tutum is a wrapper around Tutum's API for Node.js.

## Installation

    $ npm install tutum

## Quick start

The first thing you need to do is to integrate tutum in your application.

```javascript
var Tutum = require('tutum');
```

Then you need create a new instance by passing using your username and your API
key.  See the [Tutum documentation](https://docs.tutum.co/v2/api) if you don't know how
to get that key.

```javascript

var client = new Tutum({
  username: 'foo',
  apiKey: 'bar'
});
```

You now can preform GET, POST, PATCH and DELETE requests using the helpers.

```javascript
client.get(path, params, callback);
client.post(path, params, callback);
client.patch(path, params, callback);
client.delete(path, params, callback);
```

Refer to the [documentation](https://docs.tutum.co/v2/api/) to find the
appropriate method and path for your request.

```javascript
// [List all successful actions](https://docs.tutum.co/v2/api/#list-all-actions)
client.get('/action', {state: 'Success'} function(error, response){
  if (error) throw error;
  console.log(response);
});

// [Start a container](https://docs.tutum.co/v2/api/#start-a-container)
client.post('/container/[UUID]/start', function(error, response){
  if (error) throw error;
  console.log(response);
});

```

## Running the tests

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://jshint.com/). To run Grunt, go to the folder where you have installed tutum-node and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt


## License

The MIT License (MIT)
Copyright (c) 2014 Golo Roden.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
