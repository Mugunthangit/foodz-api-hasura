var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/create_menu", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_menu",
				"returning": ["id","unique_id","tbl_restaurantsunique_id",
				"tbl_restaurant_foods_categoryunique_id","food_name","price",
				"is_recommended","is_active","is_veg","is_glutenfree"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
				"tbl_restaurant_foods_categoryunique_id":req.body.tbl_restaurant_foods_categoryunique_id, 
				"food_name":req.body.food_name,
				"price": req.body.price,
				"is_recommended":req.body.is_recommended,
				"is_active": req.body.is_active,
				"is_veg": req.body.is_veg,
				"is_glutenfree":req.body.is_glutenfree
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}