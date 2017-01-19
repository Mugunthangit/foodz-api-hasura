var schedule = require('node-schedule');
var myParser = require("body-parser");
var request = require('request');
require('dotenv').config()


module.exports = function(){
	schedule.scheduleJob('5 * * * * *', function(){
		request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_user_facebook_friends",
					"columns": ["friends_tbl_user_profileunique_id2"]
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
				console.log(check_user_id.friends_tbl_user_profileunique_id2)
				var get_user_id = check_user_id.friends_tbl_user_profileunique_id2;
				
				request({
				url: 'https://data.foodz.fr/v1/query',
				method: 'POST',
				headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
				json: {
					"type" : "select",
					"args" : {
						"table" : "tbl_user_profile",
						"columns": ["unique_id"],
						"where": { "unique_id": get_user_id}
						}
					  }
				},
				function(error, response, body){
					if(error) {
						console.log(error);
					} else {
						console.log(response.body.length);	
						console.log()
						if (response.body.length != 0) {
							console.log("success")
							var datas = response.body
							datas.forEach(function (change_value){
							var check_app_user = change_value.unique_id;
							console.log("It Passes")
							request({
							url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
							json: {
								"type" : "update",
								"args" : {
									"table" : "tbl_user_facebook_friends",
									"$set": {"is_app_user": true},	
									"where": { "friends_tbl_user_profileunique_id2": check_app_user}
									}
								  }
							},
							function(error, response, body){
								if(error) {
									console.log(error);
								} else {
									console.log(response.body);	
									// console.log("It Passes")
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




