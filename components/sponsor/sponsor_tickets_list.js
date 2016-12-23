var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');

module.exports = function(app){
	app.post("/sponsor_tickets_list", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.oologic14.hasura-app.io/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID':req.body.hasura_userid}
		var body ={
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurant_sponsors",
		    "columns": ["*.*"],
		    "where": {"tbl_user_profileunique_id": "123"}
		  }
		}
    require('.././https/tickets_list')(req,res,type,url,head,body);
	});	
}