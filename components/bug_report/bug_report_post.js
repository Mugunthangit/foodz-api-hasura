var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/bug_report", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_master_app_bug_report",
				"returning": ["tbl_user_profileunique_id","bug","device_info","version"],
				"objects": [
					{
					"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
					"bug":req.body.bug,
					"device_info": req.body.device_info,
					"version":req.body.version
					}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}