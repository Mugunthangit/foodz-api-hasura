var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
var shortid = require('shortid');
var generator = require('./unique_generator');
require('dotenv').config()

module.exports = function(app){
	app.post("/create_sponsor", function(req, res) {


		var weekday=new Array(7);
		weekday[0]="sunday";
		weekday[1]="monday";
		weekday[2]="tuesday";
		weekday[3]="wednesday";
		weekday[4]="thursday";
		weekday[5]="friday";
		weekday[6]="saturday";
		var d=new Date();
		var today_name_value = d.getDay();

		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_restaurant_campaign",
   			 "columns" : ["campaign_name",{"name":"retaurant_tickets_setup","columns":["weekday","validity_period_in_min","dinner_validity_period_in_min"],"where": {"weekday": weekday[d.getDay()]}}],
					"where": {"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,"is_active": true}
				}
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				var date = new Date();
				var hours = date.getUTCHours();
				var tickets_setup_value = body[0].retaurant_tickets_setup[0]
				var type = 'POST'
				var url = 'http://data.hasura/v1/query';
				var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
				if (hours < 15) {
					var timeDate = new Date();
					var expiredTime = new Date();
					expiredTime.setMinutes ( timeDate.getMinutes() + tickets_setup_value.validity_period_in_min );
					var body = {
						"type" : "insert",
						"args" : {
							"table" : "tbl_restaurant_sponsors",
							"returning": ["id","unique_id","ticket_code","tbl_restaurantsunique_id","expired_time","sponsor_name","created_at","modified_at"],
							"objects": [
							{
								"hasura_userid": req.body.hasura_userid,
								"unique_id": uuid.v1(),
								"ticket_code": generator(app,req.body.hasura_userid),
								"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
								"tbl_user_profileunique_id2": req.body.tbl_user_profileunique_id2,
								"sponsored_user_facebook_id": req.body.sponsored_user_facebook_id,
								"hashtag_used":req.body.hashtag_used,
								"expired_time": expiredTime,
								"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
								"no_of_dinein": req.body.no_of_dinein,
								"shared_message": req.body.shared_message,
								"tbl_master_share_typeunique_id": req.body.tbl_master_share_typeunique_id,
								"tbl_master_ticket_statusunique_id": 'TICKET001',
								"sponsor_name": req.body.sponsor_name,
								"created_at": timeDate,
								"modified_at": timeDate},

								]
							}
						} 
						require('.././https/hasura_post')(req,res,type,url,head,body);
					} 
					else{
						var timeDate = new Date();
						var expiredTime = new Date();
						expiredTime.setMinutes ( timeDate.getMinutes() + tickets_setup_value.dinner_validity_period_in_min );
						var body = {
							"type" : "insert",
							"args" : {
								"table" : "tbl_restaurant_sponsors",
								"returning": ["id","unique_id","ticket_code","tbl_restaurantsunique_id","expired_time","sponsor_name","created_at","modified_at"],
								"objects": [
								{"hasura_userid": req.body.hasura_userid,
								"unique_id": uuid.v1(),
								"ticket_code": generator(app,req.body.hasura_userid),
								"tbl_user_profileunique_id": req.body.tbl_user_profileunique_id,
								"tbl_user_profileunique_id2": req.body.tbl_user_profileunique_id2,
								"sponsored_user_facebook_id": req.body.sponsored_user_facebook_id,
								"hashtag_used":req.body.hashtag_used,
								"expired_time": expiredTime,
								"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
								"no_of_dinein": req.body.no_of_dinein,
								"shared_message": req.body.shared_message,
								"tbl_master_share_typeunique_id": req.body.tbl_master_share_typeunique_id,
								"tbl_master_ticket_statusunique_id": 'TICKET001',
								"sponsor_name": req.body.sponsor_name,
								"created_at": timeDate,
								"modified_at": timeDate},
								]
							}
						} 
						require('.././https/hasura_post')(req,res,type,url,head,body);
					}

				}
			});
	});
}