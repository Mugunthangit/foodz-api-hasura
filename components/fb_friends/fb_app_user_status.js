var request = require('request');
var myParser = require("body-parser");



module.exports = function(app){
	app.post("/fb_friends_sync", function(req, res){ 
		var fb_friends_data =  req.body.fb_user_friend;
		var fb_friend_list = []
		fb_friends_data.forEach(function (fb_user){
			// console.log(fb_user.fb_friend_name)
			fb_friend_list.push(fb_user.fb_friend_name)
		})
			request({
		    	url: 'http://data.hasura/v1/query',
				method: 'POST',
				headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
				json: {
					"type" : "select",
					"args" : {
						"table" : "tbl_user_facebook_friends",
						"columns": ["fb_friend_name","fb_profile_image_url","friends_facebook_id","friends_tbl_user_profileunique_id2"],
						"order_by": "+fb_friend_name",
						"where": { "fb_friend_name": { "$in": fb_friend_list }, 
					    "tbl_user_profileunique_id": req.body.tbl_user_profileunique_id
					    }
					}
				}
			}, function(error, response, body){
				if(error) {
					console.log(error);
				} else {
					// console.log(body)
					res.send(body)

				}
			})

	})
}

