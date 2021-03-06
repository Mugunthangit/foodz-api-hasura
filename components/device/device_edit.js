var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/device_edit", function(req, res) {
console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url  = 'http://data.hasura/v1/query';
		var head =  {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1};
		var body = {
			"type" : "update",
			"args" : {
				"table" : "tbl_profile_device_info",
				"returning": ["id","unique_id","tbl_user_profileunique_id","device_token","platform","is_active"],
				"$set": {
					"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id,
					"device_token":req.body.device_token,
					"platform":req.body.platform,
					"is_active":req.body.is_active
				},
				"where": {
					"unique_id": req.body.unique_id
				}
			}
		}
		require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}