var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/get_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
			var body = {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_profile",
			    "columns": ["*.*"],
			     "where":{"hasura_userid": req.body.hasura_userid}
			  }
			} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}