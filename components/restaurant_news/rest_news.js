var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/res_hashtag", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST';
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'};
		var body ={
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_user_setting",
		    "columns": [ "tbl_master_languageunique_id", "users_hash_tag_csv", "modified_at", "tbl_user_profileunique_id",  "user_cuisines_csv",
    "created_at", "free_restaurant_create_count"],
		    "where": {
		    	"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id}
		    }
		}
    require('.././https/https_rest_news')(req,res,type,url,head,body);
	    // console.log(res.users_hash_tag_csv)
	});	
}