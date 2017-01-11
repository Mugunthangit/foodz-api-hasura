var request = require('request');
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(req,res,type,url,head,body){
	console.log(head)
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, profile_body){
		if(error) {
			console.log(error);
		} else {
			request({
				method: 'POST',
				url: 'http://data.hasura/v1/query',
				headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':profile_body.returning[0].hasura_userid},
				json: {
					"type" : "insert",
					"args" : {
						"table" : "tbl_user_setting",
						"returning": [
						"tbl_user_profileunique_id",
						"tbl_master_languageunique_id",
						"users_hash_tag_csv",
						"user_cuisines_csv",
						"free_restaurant_create_count",
						"unique_id",
						"enable_notification",
						"enable_suggestions"
						],
						"objects": [
						{
							"tbl_user_profileunique_id": profile_body.returning[0].unique_id,
							"tbl_master_languageunique_id": "LAN001",
							"unique_id": uuid.v1(),
							"enable_notification": true,
							"enable_suggestions": true
						}
						]
					}
				}
			}, function(error, response, body){
				if(error) {
					console.log(error);
				} else {
					console.log(response.statusCode, body);
					console.log(body)
				}

			});
			res.send(response.statusCode, profile_body)
		};
	});
}