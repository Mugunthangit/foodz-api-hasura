var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/create_ticket_setup", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_retaurant_tickets_setup",
				"returning": ["id","unique_id","tbl_restaurant_campaignunique_id",
				"validity_period_in_min","weekday","is_percentage",
				"ticket_value","bonus_value","starts","ends","is_active","dinner_ticket_value","dinner_bonus_value"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurant_campaignunique_id": req.body.tbl_restaurant_campaignunique_id,
				"validity_period_in_min":req.body.validity_period_in_min, 
				"weekday":req.body.weekday,
				"is_percentage": req.body.is_percentage,
				"ticket_value":req.body.ticket_value,
				"bonus_value": req.body.bonus_value,
				"starts": req.body.starts,
				"ends": req.body.ends,
				"is_active": req.body.is_active,
				"dinner_ticket_value": req.body.dinner_ticket_value,
				"dinner_bonus_value":req.body.dinner_bonus_value
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}