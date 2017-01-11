var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/search_by_restaurant_city", function(req, res){
		var type = 'POST';
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid};
		var body = {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["city","restaurant_name"]
		  }
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}