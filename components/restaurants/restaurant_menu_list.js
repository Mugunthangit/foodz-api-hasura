var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
    app.post("/restaurant_menu_list", function(req, res) {
	request({
		url: 'http://data.hasura/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
					'X-Hasura-User-ID':req.body.hasura_userid},
		json: {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurant_menu",
		    "columns": ["*.*"],
		    		    "where": {"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id}

		  }
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			res.send(response.statusCode, body);
		}
	});
    });
}