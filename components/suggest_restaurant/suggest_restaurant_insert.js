var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/suggest_restaurant", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid};
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_suggestion",
				"returning": ["id","unique_id","tbl_user_profileunique_id","restaurant_name","location","geo_location","remarks"],
				"objects": [
				{"id":req.body.id,
				"unique_id": uuid.v1(),
				"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
				"restaurant_name": req.body.restaurant_name,
				"location": req.body.location,
				"geo_location": req.body.geo_location,
				"remarks": req.body.remarks
		        }]
			}
		}; 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}