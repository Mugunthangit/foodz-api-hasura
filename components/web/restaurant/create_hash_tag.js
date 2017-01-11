var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()


module.exports = function(app){
	app.post("/create_hash_tag", function(req, res) {
		var type = 'POST'
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1}
		var body = {
			"type" : "insert",
			"args" : {
				"table" : "tbl_restaturant_hashtag",
				"returning": ["id","unique_id","tbl_restaurantsunique_id","hashtag","count"],
				"objects": [
				{
				"unique_id": uuid.v1(),
				"tbl_restaurantsunique_id": req.body.tbl_restaurantsunique_id,
				"hashtag":req.body.hashtag, 
				"count":req.body.count
		    }]
			}
		}; 
    require('../.././https/hasura_post')(req,res,type,url,head,body);
	});
}