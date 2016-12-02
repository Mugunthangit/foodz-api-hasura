var request = require('request');
var myParser = require("body-parser");
module.exports = function(app){
	app.post("/edit_profile", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer muyr51a4qtwskl0p0ithrk82biwzecrj'}
		var body = {
		  "type" : "update",
		  "args" : {
		    "table" : "tbl_user_profile",
		    "$set": {"first_name":req.body.first_name,"last_name":"req.body.last_name"},
		    "where": {
		        "id": req.body.unique_id
		    }
		  }
		}
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}