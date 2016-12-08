var request = require('request');
var myParser = require("body-parser");
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
					"profile_picture":req.body.profile_picture,
					"facebook_profile":req.body.facebook_profile
				},
				"where": {
					"unique_id": req.body.unique_id
				}
			}
		}
		require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}