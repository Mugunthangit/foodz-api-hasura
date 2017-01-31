var request = require('request');
var myParser = require("body-parser");
var schedule = require('node-schedule');

require('dotenv').config()

module.exports = function(req,res,app){
	var date = new Date();
	schedule.scheduleJob('* * * *', function(){
		var type = 'POST';
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1};
		var body ={
			  "type" : "update",
			  "args" : {
			    "table" : "tbl_restaurant_sponsors",
			    "$set": {"tbl_master_ticket_statusunique_id": "TICKET003"},
			    "where": {
			        "expired_time": { "$lt": date }
			    }
			  }
			}
    require('./hasura_post')(req,res,type,url,head,body);
	});	
}