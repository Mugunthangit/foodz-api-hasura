var request = require('request');
var myParser = require("body-parser");

module.exports = function(app){
	app.post("/my_fb_friends", function(req, res){ 
	var data = []
	var fb_friends_data =  req.body.fb_user_friend;
	for (i=0; i<fb_friends_data.length; i++){	
		var obj = fb_friends_data[i];
		console.log(obj.fb_friend_name)
		console.log("===================")
		// console.log(obj1)
		// console.log("===================")
		// console.log(obj.friends_facebook_id);
		console.log(i);
        request({
        	url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "columns": ["*.*"],
			    "where":{
			    	"fb_friend_name":obj.fb_friend_name
			    }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.body.length);
				console.log("It works")
				// res.send(response.statusCode, body)
			if (response.body.length == 0) { 
			request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
			  "type" : "insert",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "returning": [
						"friends_facebook_id",
						"fb_friend_name",
						"fb_profile_image_url",
						"tbl_user_profileunique_id"					],
			    "objects":[
			    {
			    	"friends_facebook_id":obj.friends_facebook_id,
			    	"fb_friend_name": obj.fb_friend_name,
			    	"fb_profile_image_url":obj.fb_profile_image_url,
			    	"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id			    
			    }
			    ]
			  }
			}
			},
			function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.body);
				console.log("It Passes")
				// res.send(response.statusCode, body)
			}
			});
			}
			else{
			request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
			  "type" : "update",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "returning": [
						"friends_facebook_id",
						"fb_friend_name",
						"fb_profile_image_url",
						"tbl_user_profileunique_id"
					],
					"$set": {
					"friends_facebook_id":obj.friends_facebook_id,
					"fb_friend_name":obj.fb_friend_name,
					"fb_profile_image_url":obj.fb_profile_image_url
				},
				"where":{
					"fb_friend_name":obj.fb_friend_name
				}
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.body);
				console.log("It sucks")
				var new_values = response.body
				new_values.forEach(function (vals){
					console.log(vals)
				})
				// res.send(response.statusCode, body)
			}
		});
		}
		}
        })
	}
	});
};
