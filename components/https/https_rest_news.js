var request = require('request');
var rest_news_callback = require('./rest_news_callback');
require('dotenv').config()

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


module.exports = function(req,res,type,url,head,body){
	request({
		url: url,
		method: type,
		headers: head,
		json: body
			}, function(error, response, body, callback){
			if(error) {
				console.log(error);
				} else {
				var hash_values = [];
	            body.forEach(function(arr) {
            		var hash_tag_array = arr.users_hash_tag_csv.split(',');
            		// var restaurant_id_array = [];
            		var chumma= "inside the loop";
                	hash_tag_array.forEach(function (arrayItem) {
	            		// var restaurant_id_array = [];
		                request({
							url: 'http://data.hasura/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
							json: {
							  "type" : "select",
							  "args" : {
							    "table" : "tbl_restaturant_hashtag",
							    "columns": ["tbl_restaurantsunique_id"	],
							    "where":{"hashtag": arrayItem }
										}
									}
								},
							function (error, response, body, callback){
								if(error) {
									console.log(error);
								} else {
									function array_test(){
									// var data = response.body
									}
									// restaurant_id_array.concat(data)
							// 		console.log("+++++++++++++++++++++++++++++++++++=");
							// 		data.forEach(function(objects){
							// 		var x = objects
							// 		request({
							// 		url: 'https://data.oologic14.hasura-app.io/v1/query',
							// 		method: 'POST',
							// 		headers: {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'},
							// 		json: {
							// 		  "type" : "select",
							// 		  "args" : {
							// 		    "table" : "tbl_restaurant_news",
							// 		    "columns": ["*"],
							// 		    "where":{"tbl_restaurantsunique_id": objects.tbl_restaurantsunique_id }
							// 		  			}
							// 				}
							// 			}, function(error, response, body){
							// 		if(error) {
							// 			console.log(error);
							// 		} else {
							// 			console.log(response.statusCode,body)
							// 			// res.send(response.statusCode,body);
							// 			var injected_response_data = body;
							// 			console.log(injected_response_data)
							// 		    res.send(response.statusCode,body);
							// 		}															
							// 	});
 						};
					});
				});
            	var data = arrays_value(response,body);
			});
		};
	});
};