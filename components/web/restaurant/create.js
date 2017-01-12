var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/restaurant_api", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurants",
				"returning": ["id","unique_id","tbl_user_profileunique_id","foodz_agenttbl_user_profileunique_id","restaurant_facebook_page","conversion_count","banner_image",
				"hashtag", "address", "avg_cost", "city", "state", "pincode","geolocation_lat","geolocation_long", "telephone","alt_telephone", "mobile","alt_mobile", "email", "website",
				"locking_period_min", "restaurant_name", "description", "working_hrs", "tbl_master_languageunique_id", "payment_types", "no_of_seats", "max_group_limit" ],
				"objects": [
				{
				"id":req.body.id,
				"unique_id": uuid.v1(),
				"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
				"foodz_agenttbl_user_profileunique_id": req.body.foodz_agenttbl_user_profileunique_id,
				"restaurant_facebook_page":req.body.restaurant_facebook_page,
				"conversion_count":req.body.conversion_count,
				"banner_image":req.body.banner_image,
				"hashtag":req.body.hashtag,
				"address" :req.body.address,
				"avg_cost" :req.body.avg_cost,
				"city" :req.body.city,
				"state" :req.body.state,
				"pincode":req.body.pincode,
				"geolocation_lat":req.body.geolocation_lat,
				"geolocation_long":req.body.geolocation_long,
				"telephone":req.body.telephone,
				"alt_telephone":req.body.alt_telephone, 
				"mobile":req.body.mobile,
				"alt_mobile":req.body.alt_mobile, 
				"email":req.body.email, 
				"website":req.body.website,
				"locking_period_min":req.body.locking_period_min, 
				"restaurant_name":req.body.restaurant_name, 
				"description":req.body.description, 
				"working_hrs":req.body.working_hrs, 
				"tbl_master_languageunique_id":req.body.tbl_master_languageunique_id, 
				"payment_types":req.body.payment_types, 
				"no_of_seats":req.body.no_of_seats, 
				"max_group_limit":req.body.max_group_limit
		        }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}