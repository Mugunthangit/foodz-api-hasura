var request = require('request');
var myParser = require("body-parser");

module.exports = function(app){
    app.post("/restaurant_menu_category", function(req, res) {
	request({
		url: 'https://data.oologic14.hasura-app.io/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization': 'Bearer hbspj9dh2opcowd5nxj0s7bpl3mix3uv'},
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
			console.log(response.statusCode, body);
			res.send(response.statusCode, body);
		}
	});
    });
}