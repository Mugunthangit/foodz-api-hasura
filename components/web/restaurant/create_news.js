var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');


module.exports = function(app){
	app.post("/create_news", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_news",
				"returning": ["id","unique_id","tbl_restaurantsunique_id",
				"news_info","news_image_url","visibility_start_date","visibility_end_date","is_approved"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurantsunique_id":req.body.tbl_restaurantsunique_id,
				"news_info": req.body.news_info,
				"news_image_url":req.body.news_image_url,
				"visibility_start_date": req.body.visibility_start_date,
				"visibility_end_date":req.body.visibility_end_date,
				"is_approved":req.body.is_approved				
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}