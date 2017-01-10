var request = require('request');
var myParser = require("body-parser");

module.exports = function(app){
	app.post("/search_by_fb_friend", function(req, res){
		var type = 'POST';
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid};
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_user_facebook_friends",
		    "columns": ["friends_facebook_id","friends_tbl_user_profileunique_id2"],
		    "where":{"tbl_user_profileunique_id":req.body.tbl_user_profileunique_id}
		  }
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}