var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/edit_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
		  "type" : "update",
		  "args" : {
		    "table" : "tbl_user_profile",
		    "$set": {"first_name":req.body.first_name,"last_name":"req.body.last_name","profile_picture":req.body.profile_picture,
				"facebook_profile":req.body.facebook_profile},
		    "where": {
		        "unique_id": req.body.unique_id
		    }
		  }
		}
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}