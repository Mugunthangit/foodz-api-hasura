var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/user_settings", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
					'X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
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
					"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
					"tbl_master_languageunique_id":req.body.tbl_master_languageunique_id,
					"users_hash_tag_csv": req.body.users_hash_tag_csv,
					"user_cuisines_csv":req.body.user_cuisines_csv,
					"free_restaurant_create_count":req.body.free_restaurant_create_count,
					"unique_id": uuid.v1(),
					"enable_notification": req.body.enable_notification,
					"enable_suggestions": req.body.enable_suggestions
					}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}