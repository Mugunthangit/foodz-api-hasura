var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');


module.exports = function(app){
	app.post("/sponsor_msg", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "update",
			"args" : {
				"table" : "tbl_restaurant_sponsors",
				"returning": ["id","unique_id","hashtag_used","shared_message"],
				"$set": 
				{
				"hashtag_used":req.body.hashtag_used,
				"shared_message": req.body.shared_message
                },
                "where": {
					"unique_id": req.body.unique_id				
				}
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}