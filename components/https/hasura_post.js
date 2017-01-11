var request = require('request');
require('dotenv').config()

module.exports = function(req,res,type,url,head,body){
	console.log(head)
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			res.send(response.statusCode, body)
		}
	});
}