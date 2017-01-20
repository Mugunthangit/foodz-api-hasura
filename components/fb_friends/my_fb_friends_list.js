var request = require('request');
var myParser = require("body-parser");
var restaurant_sponsors = require('./fb_friends_restaurant_sponsors');


module.exports = function(app){
	app.post("/my_fb_friends", function(req, res){ 
	var callback_obj = {};
	restaurant_sponsors(app,callback_obj,req.body.tbl_restaurantsunique_id, req.body.tbl_user_profileunique_id);
	setTimeout(function() {
	if (callback_obj.restaurant_sponsor_value != null) { 
		var fb_friends_data =  req.body.fb_user_friend;
		fb_friends_data.forEach(function (fb_user){

		console.log(fb_user.fb_friend_name)
		console.log("===================")
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
			    	"fb_friend_name":fb_user.fb_friend_name
			    }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.statusCode, body);
				console.log("It works")
				console.log("success")
				console.log(callback_obj.restaurant_sponsor_value)
				if (body == 0) { 
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
							console.log(body);
							console.log("It 1111111111111111111111111111111111111111111")
							request({
							url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
									json: {
									  "type" : "select",
									  "args" : {
									    "table" : "tbl_user_facebook_friends",
									    "columns": ["*"],
									    "where": {"fb_friend_name":fb_user.fb_friend_name }
									  }
									}
								}, function(error, response, body){
									if(error) {
										console.log(error);
									} else {
										console.log("success")
										fb_user["is_check"] = true
										console.log("======================================================================")
										console.log(fb_user)
										// res.send(response.statusCode, fb_obj)
								}
								});
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
							console.log(body);
							console.log("It sucks")
							request({
							url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
									json: {
									  "type" : "select",
									  "args" : {
									    "table" : "tbl_user_facebook_friends",
									    "columns": ["*"],
									    "where": {"fb_friend_name":fb_user.fb_friend_name }
									  }
									}
								}, function(error, response, body){
									if(error) {
										console.log(error);
									} else {
										console.log("success")
										fb_user["is_check"] = true
										console.log("======================================================================")
										console.log(fb_user)
								}
								});

						}
					});
					}
				
				

			
			}
		    
       	 })
		})
		setTimeout(function() {
				    res.send(fb_friends_data);
				    console.log('after response','---------------------------------------');
				    return true;
				}, 2000);
			}
			else{
				var fb_friends_data =  req.body.fb_user_friend;
		fb_friends_data.forEach(function (fb_user){

		console.log(fb_user.fb_friend_name)
		console.log("===================")
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
			    	"fb_friend_name":fb_user.fb_friend_name
			    }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				console.log(response.statusCode, body);
				console.log("It works")
				console.log("success")
				console.log(callback_obj.restaurant_sponsor_value)
				if (body == 0) { 
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
							console.log(body);
							console.log("It 1111111111111111111111111111111111111111111")
							request({
							url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
									json: {
									  "type" : "select",
									  "args" : {
									    "table" : "tbl_user_facebook_friends",
									    "columns": ["*"],
									    "where": {"fb_friend_name":fb_user.fb_friend_name }
									  }
									}
								}, function(error, response, body){
									if(error) {
										console.log(error);
									} else {
										console.log("success")
										fb_user["is_check"] = false
										console.log("======================================================================")
										console.log(fb_user)
										// res.send(response.statusCode, fb_obj)
								}
								});
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
							console.log(body);
							console.log("It sucks")
							request({
							url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
									json: {
									  "type" : "select",
									  "args" : {
									    "table" : "tbl_user_facebook_friends",
									    "columns": ["*"],
									    "where": {"fb_friend_name":fb_user.fb_friend_name }
									  }
									}
								}, function(error, response, body){
									if(error) {
										console.log(error);
									} else {
										console.log("success")
										fb_user["is_check"] = false
										console.log("======================================================================")
										console.log(fb_user)
								}
								});

						}
					});
					}
				
				

			
			}
		    
       	 })
		})
		setTimeout(function() {
				    res.send(fb_friends_data);
				    console.log('after response','---------------------------------------');
				    return true;
				}, 2000);
			}
		}, 3000)

	});
};
