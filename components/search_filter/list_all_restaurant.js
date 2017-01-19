var request = require('request');
var myParser = require("body-parser");

module.exports = function(app){
	app.post("/search_by_restaurant", function(req, res){
		var type = 'POST';
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid};
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["*.*"],
		    "where":{
		    	"city":req.body.city,
		    	"hashtag": req.body.hashtag,
		    	"restaurant_name":req.body.restaurant_name
		    }
		  }
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}