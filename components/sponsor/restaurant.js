var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
var shortid = require('shortid');
var generator = require('./unique_generator');
require('dotenv').config()
module.exports = function(app){
	app.post("/create_sponsor", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		console.log(generator(app,req.body.hasura_userid));
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaurant_sponsors",
				"returning": ["id","unique_id","ticket_code","tbl_restaurantsunique_id","expired_time"],
				"objects": [
				{"hasura_userid": req.body.hasura_userid,
				"unique_id": uuid.v1(),
				"ticket_code": generator(app,req.body.hasura_userid),
				"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
				"tbl_user_profileunique_id2": req.body.tbl_user_profileunique_id2,
				"sponsored_user_facebook_id": req.body.sponsored_user_facebook_id,
				"hashtag_used":req.body.hashtag_used,
				"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
                "no_of_dinein": req.body.no_of_dinein,
                "shared_message": req.body.shared_message,
                "tbl_master_share_typeunique_id": req.body.tbl_master_share_typeunique_id,
                "tbl_master_ticket_statusunique_id": 'TICKET001'}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}