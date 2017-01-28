var schedule = require('node-schedule');
var myParser = require("body-parser");
var request = require('request');
require('dotenv').config()


module.exports = function(){
	schedule.scheduleJob('2 * * * * *', function(){
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_user_facebook_friends",
					"columns": ["fb_friend_name"]
				}
			}
		},
		function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				// console.log(response.body);	
				// console.log("It Passes")
				var values =  response.body;
				values.forEach(function (check_user_id){
				// console.log(check_user_id.friends_tbl_user_profileunique_id2)
				var get_user_id = check_user_id.fb_friend_name;
				
				request({
				url: 'http://data.hasura/v1/query',
				method: 'POST',
				headers:  {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
				json: {
					"type" : "select",
					"args" : {
						"table" : "tbl_user_profile",
						"columns": ["fb_friend_name","facebook_profile", "unique_id"],
						"where": { "fb_friend_name": get_user_id}
						}
					  }
				},
				function(error, response, body){
					if(error) {
						console.log(error);
					} else {
						console.log(response.body);	
						console.log(get_user_id)
						if (response.body.length != 0) {
							// console.log("success")
							// console.log()
							var datas = response.body
							console.log(response.body)
							datas.forEach(function (change_value){
							var check_app_user = change_value.fb_friend_name;
							var fb_unique_id = change_value.unique_id
							// console.log("It Passes")
							request({
							url: 'http://data.hasura/v1/query',
							method: 'POST',
							headers:  {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
							json: {
								"type" : "update",
								"args" : {
									"table" : "tbl_user_facebook_friends",
									"$set": {"is_app_user": true,
									"friends_tbl_user_profileunique_id2": fb_unique_id},	
									"where": { "fb_friend_name": check_app_user}
									}
								  }
							},
							function(error, response, body){
								if(error) {
									console.log(error);
								} else {
									console.log(response.body);	
									console.log("It Passes")
								}
							})
						})	
						}
					
					}
				})
			})

			}
		})
	});
	    console.log('Welcome to foodz');

};




