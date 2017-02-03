var request = require('request');
var myParser = require("body-parser");


module.exports = function(app){
	app.post("/feedback", function(req, res) {
		var type = 'POST'
		var url  = 'http://data.hasura/v1/query';
		var head =  {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': req.body.hasura_userid};
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_feedback",
				"returning": ["tbl_user_profileunique_id","subject","description"],
				"objects": [
					{
					"tbl_user_profileunique_id" : req.body.tbl_user_profileunique_id, 
					"subject": req.body.subject, 
					"description":req.body.description
					}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}