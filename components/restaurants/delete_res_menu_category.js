var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
    app.post("/delete_restaurant_menu", function(req, res) {
	request({
		url: 'http://data.hasura/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
					'X-Hasura-User-ID':req.body.hasura_userid},
		json: {
		  "type" : "delete",
		  "args" : {
		    "table" : "tbl_restaurant_menu",
		    "returning": ["*.*"],
		    "where": {"food_name": req.body.food_name}
		  }
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			res.send(response.statusCode, body);
		}
	});
    });
}