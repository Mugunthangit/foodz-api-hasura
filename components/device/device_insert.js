var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');


module.exports = function(app){
	app.post("/device_api", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
					'X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_profile_device_info",
				"returning": ["id","unique_id","tbl_user_profileunique_id","device_token","platform","is_active"],
				"objects": [
				{"id":req.body.id,
				"unique_id": uuid.v1(),
				"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
				"device_token": req.body.device_token,
				"platform": req.body.platform,
				"is_active": req.body.is_active,
		        }]
			}
		}; 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}