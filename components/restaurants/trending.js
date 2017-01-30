var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()
module.exports = function(app){
	app.post("/restaurants/trending_restaurants", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1};
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["id","unique_id","restaurant_name","description","banner_image","avg_cost",
		    "city","geolocation_lat","geolocation_long","mobile","alt_mobile","email","website","trend_score","trend_ratio",	
		    "payment_types","no_of_seats","max_group_limit",{"name": "restaurant_hashtag", "columns": ["hashtag","unique_id"]}],
		   	"order_by":"+trend_ratio"		  }
		} 
    require('.././https/temp_hasura_post')(req,res,type,url,head,body);
	});
}