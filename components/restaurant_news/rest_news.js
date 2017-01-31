var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/restaurant_news", function(req, res) {
		var type = 'POST';
		var url = 'https://data.foodz.fr/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer i2wfk5p2dnyi01bvvj7i6k2t1jipepcj'};
		var body ={
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_setting",
			    "columns" : ["users_hash_tag_csv"],
			    "where": {"tbl_user_profileunique_id": req.body.unique_id}
			  }
			}
    require('./get_news')(req,res,type,url,head,body);
	});	
}