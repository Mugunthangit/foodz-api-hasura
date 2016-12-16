var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');

module.exports = function(app){
	app.post("/favorite", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_user_favorite",
				"returning": ["id","unique_id","tbl_user_profileunique_id","tbl_restaurantsunique_id"],
				"objects": [
				{"unique_id":uuid.v1(),
				"tbl_user_profileunique_id" : req.body.tbl_user_profileunique_id,
				"tbl_restaurantsunique_id":req.body.tbl_restaurantsunique_id}
				]
			}
		} 
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
	app.post("/undo_favorite", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body = {
			  "type" : "delete",
			  "args" : {
			    "table" : "tbl_user_favorite",
			    "where": {
			       "unique_id": req.body.unique_id
			    }
			  }
			}
    require('.././https/hasura_post')(req,res,type,url,head,body);
	});
}