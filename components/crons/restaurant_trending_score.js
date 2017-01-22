var request = require('request');
var uuid = require('node-uuid');
var ratio = require('./callbacks/ratio');
var trend_ratio = require('./callbacks/trend_ratio');
var trend_score = require('./callbacks/trend_score');
var schedule = require('node-schedule');

require('dotenv').config()
module.exports = function(app){
	schedule.scheduleJob('* * * *', function(){
		console.log("restaurant_trending_score");
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
        console.log(res_body)

        res_body.forEach( function (res_arrayItem){





					request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
						json: {
						  "type" : "select",
						  "args" : {
						    "table" : "tbl_master_trendscore_calculator",
						    "columns": ["*"],
						    "where": { "range_start": { "$gte": res_arrayItem.trend_ratio },"range_end": { "$lte": res_arrayItem.trend_ratio } }

						  }
						}
					}, function(error, response, res_score_body){
						if(error) {
							console.log(error);
						} else {
								request({
									url: 'http://data.hasura/v1/query',
									method: 'POST',
									headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
									json: {
									  "type" : "update",
									  "args" : {
									    "table" : "tbl_restaurants",
									    "$set": {"trend_score": res_score_body[0].id},
									    "where": {
									        "unique_id": res_arrayItem.unique_id
									    }
									  }
									}
								}, function(error, response, body){
									if(error) {
										console.log(error);
									} else {
										console.log(response.statusCode, body);
									}
								});				
							}
					});







  			});



			}
		});

	});
}