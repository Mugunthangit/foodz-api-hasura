var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
    app.post("/get_popular_restaurant_by_friends", function(req, res) {
	request({
		url: 'https://data.foodz.fr/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
		json:  {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "columns": ["friends_tbl_user_profileunique_id2"],
			     "where":{"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id}
			  }
			} 
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			body.forEach(function (values){
				console.log(values.friends_tbl_user_profileunique_id2)
				if (values.friends_tbl_user_profileunique_id2 != null){
					console.log("+++++++++++++++++++++++++++++++++++++++++")
					console.log(values.friends_tbl_user_profileunique_id2)
					request({
					url: 'https://data.foodz.fr/v1/query',
					method: 'POST',
					headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
					json: {
						"type" : "select",
						"args" : {
							"table" : "tbl_restaurant_sponsors",
							"columns": ["tbl_restaurantsunique_id"],
							"where":
							{
								"tbl_user_profileunique_id": values.friends_tbl_user_profileunique_id2
							}
						}
					} 
				}, function(error, response, body){
					if(error) {
						console.log(error);
					} else {
						console.log(body);
						counter = {}
						body.forEach(function(obj) {
						    var key = JSON.stringify(obj)
						    counter[key] = (counter[key] || 0) + 1
						})
						console.log(counter)
					}
				});
				}
			})
		}
	});
    });
}
