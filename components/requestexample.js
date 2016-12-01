var express = require('express')
var app = express()
var request = require('request');
    //Lets configure and request
    var name = 'deva';
    var password = 'password';
	request({
	    url: 'https://auth.oologic14.hasura-app.io/login', //URL to hit
	    method: 'POST',
	    //Lets post the following key/values as form
	    json: {
	        username: name,
	        password: password
	    }
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	}
	});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

