var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/search_by_fb_friend", function(req, res){
		var type = 'POST';
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'};
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_master_hashtag",
		    "columns": ["friends_facebook_id","friends_tbl_user_profileunique_id2"],
		    "where":{"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id}
		  }
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}