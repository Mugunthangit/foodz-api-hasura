var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/create_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer muyr51a4qtwskl0p0ithrk82biwzecrj'}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_user_profile",
				"returning": ["id","hasura_userid","unique_id","first_name","last_name","profile_picture","tbl_master_profile_statusunique_id","facebook_profile"],
				"objects": [
				{"hasura_userid" : req.body.hasura_userid, "unique_id": req.body.unique_id,"first_name":req.body.first_name,
				"last_name": req.body.last_name,"profile_picture":req.body.profile_picture,
				"email":req.body.email,"mobile_no":req.body.mobile_no,"tbl_master_profile_statusunique_id":req.body.tbl_master_profile_statusunique_id,
				"facebook_profile":req.body.facebook_profile}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}