var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/create_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var head = {'Content-Type':'application/json', 'Authorization':'Bearer i9y3tntpwvtymyxdmbpljgt6raumzed0'}
		var body = {"hasura_userid" : req.body.hasura_userid, "unique_id": req.body.unique_id,"first_name":req.body.first_name,
				"last_name": req.body.last_name,"profile_picture":req.body.profile_picture,
				"email":req.body.email,"mobile_no":req.body.mobile_no,"tbl_master_profile_statusunique_id":req.body.tbl_master_profile_statusunique_id,
				"facebook_profile":req.body.facebook_profile} 
    require('./https/hasura_post')(req,res,head,body);
	});
}