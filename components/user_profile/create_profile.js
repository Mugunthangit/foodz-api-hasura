var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/create_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
					'X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_user_profile",
				"returning": ["id","hasura_userid","unique_id","first_name",
				"last_name","profile_picture",
				"tbl_master_profile_statusunique_id","facebook_profile"],
				"objects": [
				{"hasura_userid" : req.body.hasura_userid, 
				"unique_id": req.body.unique_id,"first_name":req.body.first_name,
				"last_name": req.body.last_name,
				"profile_picture":req.body.profile_picture,
				"facebook_profile":req.body.facebook_profile,
				"personal_description":req.body.personal_description,
				"city": req.body.city,"state": req.body.state,
				"country": req.body.country,"email":req.body.email,
				"mobile_no":req.body.mobile_no,
				"tbl_master_profile_statusunique_id":req.body.tbl_master_profile_statusunique_id}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}