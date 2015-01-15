'use strict';

var Tutum = require('../lib/tutum');

var client = new Tutum({
  username: process.env.TUTUM_USERNAME || '',
  apiKey: process.env.TUTUM_APIKEY || ''
});

var params = {image: 'tutum/hello-world'};
client.post('service', params, function(error, response){
  if (error) {
    throw error;
  }
  console.log(response);
});
