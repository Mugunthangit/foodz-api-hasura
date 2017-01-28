var request = require('request');
var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.post("/restaurants/recommended_by_me", function(req, res) {
		console.log(req.headers);
		console.log(req.body);
		var type = 'POST'
		var url = 'https://data.foodz.fr/v1/query';
		var head = {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'};
		var body = {
			"type" : "select",
			"args" : 
			{
			"table" : "tbl_restaurants",
			"returning": ["restaurant_name"],
			"columns": ["id","unique_id","restaurant_name","description",
				"banner_image","avg_cost",
				"city","geolocation_lat","geolocation_long","mobile","alt_mobile","email","website","trend_score",
				"payment_types","no_of_seats","max_group_limit",{"name": "restaurant_hashtag", "columns": ["hashtag","unique_id"]}],
				 "where": {
      				"restaurant_sponsor": {"tbl_user_profileunique_id":  req.body.unique_id } 
				}
			}
		} 
    require('.././https/temp_hasura_post')(req,res,type,url,head,body);
	});
}
