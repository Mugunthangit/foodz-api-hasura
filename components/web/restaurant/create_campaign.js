var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');


module.exports = function(app){
	app.post("/create_campaign", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_campaign",
				"returning": ["id","unique_id","tbl_restaurantsunique_id",
				"campaign_name","start_date","end_date","is_active"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurantsunique_id":req.body.tbl_restaurantsunique_id,
				"campaign_name": req.body.campaign_name,
				"start_date":req.body.start_date,
				"end_date": req.body.end_date,
				"is_active":req.body.is_active
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}