var request = require('request');
var uuid = require('node-uuid');
var schedule = require('node-schedule');
require('dotenv').config()
module.exports = function(app){
	app.post("/popular_friends", function(req, res) {
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_user_profile",
					"columns": ["unique_id"],
				}
			}
		}, function(error, response, prof_body){
			if(error) {
				console.log(error);
			} else {
				prof_body.forEach( function (prof_arrayItem){
					request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
						json: 	{
							"type" : "select",
							"args" : 
							{
								"table" : "tbl_user_facebook_friends",
								"columns": ["friends_tbl_user_profileunique_id2"],
								"where": {	"tbl_user_profileunique_id": prof_arrayItem.unique_id, "friends_tbl_user_profileunique_id2": { "$ne": null }	} 
							}
						}
					}, function(error, response, frinds_body){
						if(error) {
							console.log(error);
						} else {
							console.log(frinds_body)
							var friends_arr =[];
							frinds_body.forEach( function (arrayItem){
								friends_arr.push(arrayItem.friends_tbl_user_profileunique_id2);
							});
							request({
								url: 'http://data.hasura/v1/query',
								method: 'POST',
								headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
								json: 	{
									"type" : "select",
									"args" : 
									{
										"table" : "tbl_restaurants",
										"columns": ["unique_id"],
									}
								}
							}, function(error, response, res_body){
								if(error) {
									console.log(error);
								} else {
									res_body.forEach( function (res_arrayItem){
										request({
											url: 'http://data.hasura/v1/query',
											method: 'POST',
											headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
											json: {
												"type" : "count",
												"args" : {
													"table" : "tbl_restaurant_sponsors",
													"where": {"tbl_user_profileunique_id": { "$in": friends_arr },"tbl_restaurantsunique_id": res_arrayItem.unique_id}
												}
											}
										}, function(error, response, sponsor_body){
											if(error) {
												console.log(error);
											} else {
												request({
													url: 'https://data.foodz.fr/v1/query',
													method: 'POST',
													headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
													json: {
													  "type" : "select",
													  "args" : {
													    "table" : "popular_restaurant",
													    "columns": ["*"],
													    "where": {
													        "tbl_user_profileunique_id": prof_arrayItem.unique_id,"tbl_restaurantunique_id": res_arrayItem.unique_id
													    }
													  }
													}
												}, function(error, response, condition_body){
													if(error) {
														console.log(error);
													} else {
                            if (condition_body.length > 0) {

                            	request({
															url: 'http://data.hasura/v1/query',
															method: 'POST',
															headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
															json: {
															  "type" : "update",
															  "args" : {
															    "table" : "popular_restaurant",
															    "$set": {"friends_count": sponsor_body.count},
															    "where": {
																		"tbl_user_profileunique_id" : prof_arrayItem.unique_id,"tbl_restaurantunique_id": res_arrayItem.unique_id															    }
															  }
															}
														}, function(error, response, body){
															if(error) {
																console.log(error);
															} else {
																console.log("-----------------------------------------------------")
																console.log("popular restaurant update");
															}
														});
                            }
                            if (condition_body.length == 0) {
                            	
                            	request({
															url: 'http://data.hasura/v1/query',
															method: 'POST',
															headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
															json: {
																"type" : "insert",
																"args" : {
																	"table" : "popular_restaurant",
																	"returning": ["id"],
																	"objects": [
																	{
																		"unique_id": uuid.v1(),
																		"tbl_user_profileunique_id" : prof_arrayItem.unique_id, 
																		"tbl_restaurantunique_id": res_arrayItem.unique_id,
																		"friends_count": sponsor_body.count
																	}
																	]
																}
															}
														}, function(error, response, body){
															if(error) {
																console.log(error);
															} else {
																console.log("-----------------------------------------------------")
																console.log("popular restaurant insertion");
															}
														});
                            }
													}
												});
											}
										});
									});
								}
							});
						}
					});
				});
			}
		});
	});
}