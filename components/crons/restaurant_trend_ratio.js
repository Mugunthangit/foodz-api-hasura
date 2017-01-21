var request = require('request');
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/restaurant_trend_ratio", function(req, res) {
		console.log("restaurant_trend_ratio");
		request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer rguevrq5m3j4amwxuojjnvtdqvav0nwc'},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_restaurants",
					"columns": ["id","unique_id","restaurant_name","description",
					"banner_image","avg_cost",
					"city","geolocation_lat","geolocation_long","mobile","alt_mobile","email","website",
					"payment_types","no_of_seats","max_group_limit",{"name": "restaurant_hashtag", "columns": ["hashtag","unique_id"]}]
				}
			} 
		}, function(error, response, res_body){
			if(error) {
				console.log(error);
			} else {
				res_body.forEach( function (res_arrayItem){
					request({
						url: 'https://data.foodz.fr/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','Authorization':'Bearer rguevrq5m3j4amwxuojjnvtdqvav0nwc'},
						json: {
							"type" : "update",
							"args" : {
								"table" : "tbl_restaurants",
								"returning" : ["id"],
								"$set": {"ratio": 50,"trend_ratio": 100,"trend_score": 3},
								"where": {
									"unique_id": res_arrayItem.unique_id
								}
							}
						}
					}, function(error, response, body){
						if(error) {
							console.log(error);
						} else {
							console.log(res_arrayItem);
						}
					});
				});
			}
		});
	});
}