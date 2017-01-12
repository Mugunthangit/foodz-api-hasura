var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()
module.exports = function(app){
	app.post("/edit_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "update",
			"args" : {
				"table" : "tbl_user_profile",
				"returning": ["id", "hasura_userid", "unique_id",
				"first_name", "last_name", "middle_name", "personal_description",
				"nickname", "company_name", "profile_picture", "facebook_profile",
				"facebook_access_token", "email", "alt_email", "telephone", "alt_telephone",
				"country_code", "mobile_no", "address", "city", "state", "country",
				"pincode", "tbl_master_profile_statusunique_id"],
				"$set": {
					"first_name":req.body.first_name,
					"last_name":req.body.last_name,
					"nickname": req.body.nickname,
					"company_name": req.body.company_name,
					"email": req.body.email,
					"facebook_access_token": req.body.facebook_access_token,
					"alt_email": req.body.alt_email,
					"telephone": req.body.telephone,
					"alt_telephone": req.body.alt_telephone,
					"country_code": req.body.country_code,
					"mobile_no": req.body.mobile_no,
					"address": req.body.address,
					"state": req.body.state,
					"country": req.body.country,
					"pincode": req.body.pincode,
					"tbl_master_profile_statusunique_id": req.body.tbl_master_profile_statusunique_id,
					"city": req.body.city,
					"profile_picture":req.body.profile_picture,
					"facebook_profile":req.body.facebook_profile,
					"personal_description":req.body.personal_description,

				},
				"where": {
					"unique_id": req.body.unique_id
				}
			}
		}
		require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}