var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/restaurants/recommended_by_me", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["id","restaurant_name","description","working_hrs",
		    "restaurant_facebook_page","banner_image","hashtag","avg_cost",
		    "city","geolocation_lat","geolocation_long","website"]
		  }
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}