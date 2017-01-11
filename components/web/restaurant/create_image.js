var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/create_image", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_images",
				"returning": ["id","unique_id","tbl_restaurantsunique_id","restaurant_image"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
				"restaurant_image":req.body.restaurant_image, 
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}