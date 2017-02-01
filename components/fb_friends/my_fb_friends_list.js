var request = require('request');
var myParser = require("body-parser");



module.exports = function(app){
	app.post("/my_fb_friends", function(req, res){ 
		var fb_friends_data =  req.body.fb_user_friend;
		fb_friends_data.forEach(function (fb_user){
			// fb_user["is_check"] = false	
			request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
				json: {
					"type" : "select",
					"args" : {
						"table" : "tbl_user_facebook_friends",
						"columns": ["*"],
						"where":{
							"fb_friend_name":fb_user.fb_friend_name,
							"tbl_user_profileunique":req.body.tbl_user_profileunique
						}
					}
				}
			}, function(error, response, body){
				if(error) {
					console.log(error);
				} else {
					if (body == 0) { 
						request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
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
										"friends_facebook_id":fb_user.friends_facebook_id,
										"fb_friend_name": fb_user.fb_friend_name,
										"fb_profile_image_url":fb_user.fb_profile_image_url,
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
								// fb_user["is_check"] = false
								// fb_user["is_app_user"] = false
								// console.log("worksssssssss")

							}
						});
					}
					else{
						request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
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
										"friends_facebook_id":fb_user.friends_facebook_id,
										"fb_friend_name":fb_user.fb_friend_name,
										"fb_profile_image_url":fb_user.fb_profile_image_url
									},
									"where":{
										"fb_friend_name":fb_user.fb_friend_name
									}
								}
							}
						}, function(error, response, body){
							if(error) {
								console.log(error);
							} else {
								console.log("success")
							}

						});
					}
				}
			});
		});	
		setTimeout(function() {
		res.send({"status":200,"Result":"Success"});
		return true;
		}, 1000);
	});
}

