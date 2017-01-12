var request = require('request');
var myParser = require("body-parser");

module.exports = function(app){
	app.post("/my_fb_friends", function(req, res){ 
	var data = []
	var fb_friends_data =  req.body.fb_user_friend;
	// var something = fb_friends_data
	for (i=0; i<fb_friends_data.length; i++){	
		var obj = fb_friends_data[i];
		// var obj1 = JSON.stringify(obj);
		console.log(obj)
		console.log("===================")
		// console.log(obj1)
		// console.log("===================")
		// console.log(obj.friends_facebook_id);
		console.log(i);
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid},
			json: {
			  "type" : "insert",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "returning": [
						"friends_facebook_id",
						"fb_friend_name",
						"fb_profile_image_url",
						"tbl_user_profileunique_id"
					],
			    "objects":[
			    {
			    	"friends_facebook_id":obj.friends_facebook_id,
			    	"fb_friend_name": obj.fb_friend_name,
			    	"fb_profile_image_url":obj.fb_profile_image_url,
			    	"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id			    
			    }]
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.body);
				// res.send(response.statusCode, body)
			}
		});
	}
	});
};
