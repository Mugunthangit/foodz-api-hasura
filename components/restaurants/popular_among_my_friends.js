var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/restaurants/popular_among_my_friends", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = 	{
				"type" : "select",
				"args" : 
					{
						"table" : "popular_restaurant",
						"columns": ["*.*.*"],
						"where": {"tbl_user_profileunique_id": req.body.unique_id,"friends_count":{"$ne":0}},
						"limit": 10,
						"offset":req.body.offset,
						"order_by":"-friends_count"
					}
			} 
    require('.././https/popular_hasura_post')(req,res,type,url,head,body);
	});
}