var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/restaurants/trending_restaurants", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer e2wb0wgxm1k16uuxvdlfz0zk87l7rx6s'}
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["id","unique_id","restaurant_name","description",
		    "banner_image","avg_cost",
		    "city","geolocation_lat","geolocation_long","mobile","alt_mobile","email","website",
		    "payment_types","no_of_seats","max_group_limit",{"name": "restaurant_hashtag", "columns": ["hashtag","unique_id"]}]
		  }
		} 
    require('.././https/temp_hasura_post')(req,res,type,url,head,body);
	});
}