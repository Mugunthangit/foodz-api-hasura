var request = require('request');
require('dotenv').config()

module.exports = function(app){
  app.post("/restaurants/sponser", function(req, res) {

	request({
		url: 'https://data.foodz.fr/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'},
		json: {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_sponsors",
				"returning": ["id","unique_id","ticket_code","tbl_restaurantsunique_id","expired_time"],
				"objects": [
				{"hasura_userid": req.body.hasura_userid,
				"unique_id": req.body.unique_id,
				"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
				"tbl_user_profileunique_id2": req.body.tbl_user_profileunique_id2,
				"sponsored_user_facebook_id": req.body.sponsored_user_facebook_id,
				"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
                "no_of_dinein": req.body.no_of_dinein,
                "shared_message": req.body.shared_message,
                "tbl_master_share_typeunique_id": req.body.tbl_master_share_typeunique_id,
                "tbl_master_ticket_statusunique_id": req.body.tbl_master_ticket_statusunique_id,
				"ticket_code": req.body.ticket_code}
				]
			}
		} 
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
		}
	});
    });
}