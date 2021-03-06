var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/create_profile", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid};
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_user_profile",
				"returning": ["id", "hasura_userid", "unique_id",
				 "first_name", "last_name", "middle_name", "personal_description",
				 "nickname", "company_name", "profile_picture", "facebook_profile",
				 "fb_friend_name", "email", "alt_email", "telephone", "alt_telephone",
				 "country_code", "mobile_no", "address", "city", "state", "country",
				 "pincode", "tbl_master_profile_statusunique_id"],
				"objects": [
					{
					"hasura_userid" : req.body.hasura_userid, 
					"unique_id": uuid.v1(),
					"first_name":req.body.first_name,
					"nickname":req.body.nickname,
					"last_name": req.body.last_name,
					"profile_picture":req.body.profile_picture,
					"facebook_profile":req.body.facebook_profile,
					"personal_description":req.body.personal_description,
					"city": req.body.city,
					"state": req.body.state,
					"country": req.body.country,
					"email":req.body.email,
					"mobile_no":req.body.mobile_no,
					"tbl_master_profile_statusunique_id": "PROF002"
					}
				]
			}
		} 
    require('.././https/hasura_profile_post')(req,res,type,url,head,body);
	});
}