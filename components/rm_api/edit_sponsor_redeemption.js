var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
  app.post("/edit_sponsor_redeemption", function(req, res) {
    console.log(req.headers);
    console.log(req.body);
    var type = 'POST'
    var url = 'http://data.hasura/v1/query';
    var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
    'X-Hasura-User-ID':req.body.hasura_userid}
    var body = {
		  "type" : "update",
		  "args" : {
		    "table" : "tbl_restaurant_sponsors",
		    "$set": {"bill_amount": req.body.bill_amount},
		    "returning": ["id","unique_id","tbl_user_profileunique_id","tbl_user_profileunique_id2",
		    "sponsored_user_facebook_id","tbl_restaurantsunique_id","tbl_retaurant_ticketsunique_id",
		    "qr_code_url","ticket_code","percentage_discount","no_of_dinein","shared_message",
		    "hashtag_used","share_location","shared_time","expired_time","bill_amount",
		    "is_eligible_for_bonus","tbl_master_share_typeunique_id","tbl_master_ticket_statusunique_id",
		    "note","created_at","modified_at","hasura_userid"],
		    "where": {
		        "ticket_code": req.body.ticket_code
		    }
		  }
		}
    require('.././https/hasura_post')(req,res,type,url,head,body);
  });
}