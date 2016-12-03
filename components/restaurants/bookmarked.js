var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/restaurants/bookmarked", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer prhlt4buy6j5shxp2wni7gpw22q844pw'}
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