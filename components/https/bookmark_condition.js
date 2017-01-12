var request = require('request');
require('dotenv').config()

module.exports = function(app){
    app.post("/bookmark_condition", function(req, res) {
	request({
		url: 'https://data.oologic14.hasura-app.io/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization': 'Bearer g5vhfx1i5r77kci3b9ebz80jyw5zv7d6'},
		json: {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_user_favorite",
		    "columns": ["id","unique_id","tbl_user_profileunique_id","tbl_restaurantsunique_id"],
		    "where": {"tbl_user_profileunique_id": "PROF002"}
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