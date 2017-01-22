var request = require('request');
var uuid = require('node-uuid');
var ratio = require('./callbacks/ratio');
var trend_ratio = require('./callbacks/trend_ratio');
var trend_score = require('./callbacks/trend_score');
var schedule = require('node-schedule');

require('dotenv').config()
module.exports = function(app){
	schedule.scheduleJob('* * * *', function(){
		console.log("restaurant_trend_ratio");
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
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
					ratio(res_arrayItem);
					setTimeout(function() {
					  console.log(res_arrayItem);
					  request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
						json: {
							"type" : "update",
							"args" : {
								"table" : "tbl_restaurants",
								"returning" : ["id"],
								"$set": {"ratio": res_arrayItem.ratio,"trend_ratio": 100,"trend_score": 3},
								"where": {
									"unique_id": res_arrayItem.unique_id
								}
							}
						}
					}, function(error, response, body){
						if(error) {
							console.log(error);
						} else {
							console.log("Success");
						}
					});
					}, 3000);
				});
			}
		});

	});
}