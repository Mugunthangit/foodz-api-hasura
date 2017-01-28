var request = require('request');
require('dotenv').config()

module.exports = function(app){
    app.post("/bookmark_condition", function(req, res) {
	request({
		url: 'http://data.hasura/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
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