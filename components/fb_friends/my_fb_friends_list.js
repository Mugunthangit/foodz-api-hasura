var request = require('request');
var myParser = require("body-parser");
// var restaurant_sponsors = require('./fb_friends_restaurant_sponsors');

module.exports = function(app){
	app.post("/my_fb_friends", function(req, res){ 
request({
	url: 'http://data.hasura/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
	'X-Hasura-User-ID':req.body.hasura_userid},
	json: {
		"type" : "select",
		"args" : {
			"table" : "tbl_restaurant_sponsors",
			"columns": ["*"],
			"where": {"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
			"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id}
		}
	}
}, function(error, response, body){
	if(error) {
		console.log(error);
	} else {
		console.log(body)
// setTimeout(function() {	
	if (body != null) 
	{ 
		var fb_friends_data =  req.body.fb_user_friend;
		fb_friends_data.forEach(function (fb_user){
request({
	url: 'http://data.hasura/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
	'X-Hasura-User-ID':req.body.hasura_userid},
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
if (body == 0) { 
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
// console.log(body);
request({
	url: 'http://data.hasura/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
	'X-Hasura-User-ID':req.body.hasura_userid},
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
		console.log(body)
		var sss = body
		sss.forEach(function (fb_is_app){
			console.log(fb_is_app.is_app_user)
			fb_user["is_app_user"] = fb_is_app.is_app_user
		})
	}
});
}
});
}
else{
	request({
		url: 'http://data.hasura/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid},
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
request({
	url: 'http://data.hasura/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
	'X-Hasura-User-ID':req.body.hasura_userid},
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
			console.log(body)
			var sss = body
			sss.forEach(function (fb_is_app){
				console.log(fb_is_app.is_app_user)
				fb_user["is_app_user"] = fb_is_app.is_app_user
			})
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
	else
	{
		var fb_friends_data =  req.body.fb_user_friend;
		fb_friends_data.forEach(function (fb_user){
			console.log(fb_user.fb_friend_name)
			console.log("===================")
			request({
				url: 'http://data.hasura/v1/query',
				method: 'POST',
				headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
				'X-Hasura-User-ID':req.body.hasura_userid},
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
									"objects":[{
										"friends_facebook_id":fb_user.friends_facebook_id,
										"fb_friend_name": fb_user.fb_friend_name,
										"fb_profile_image_url":fb_user.fb_profile_image_url,
										"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id			    
									}]
								}
							}
						},
						function(error, response, body){
							if(error) {
								console.log(error);
							} else {
								request({
									url: 'http://data.hasura/v1/query',
									method: 'POST',
									headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
									'X-Hasura-User-ID':req.body.hasura_userid},
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
										console.log(body)
										var sss = body
										sss.forEach(function (fb_is_app){
											console.log(fb_is_app.is_app_user)
											fb_user["is_app_user"] = fb_is_app.is_app_user
										})
									}
								});
							}
						});
					}
					else{
						request({
							url: 'http://data.hasura/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
							'X-Hasura-User-ID':req.body.hasura_userid},
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
									url: 'http://data.hasura/v1/query',
									method: 'POST',
									headers: {'Content-Type':'application/json','X-Hasura-Role':'admin',
									'X-Hasura-User-ID':req.body.hasura_userid},
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
										console.log(body)
										var sss = body
										sss.forEach(function (fb_is_app){
											console.log(fb_is_app.is_app_user)
											fb_user["is_app_user"] = fb_is_app.is_app_user
										})
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
// }, 3000)
}
});

});
};

