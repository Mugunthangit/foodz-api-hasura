var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()
module.exports = function(app){
	app.post("/restaurants/bookmarked", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_user_favorite",
		    "columns": ["*.*"],
		    "where": {"tbl_user_profileunique_id": req.body.unique_id}
		  }
		}
    require('.././https/bookmark_hasura_post')(req,res,type,url,head,body);
	});
}