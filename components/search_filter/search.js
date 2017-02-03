		var request = require('request');
require('dotenv').config()

module.exports = function(app){
	app.post("/search_by_restaurant_city", function(req, res){
		var type = 'POST';
		var url = 'http://data.hasura/v1/query';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID':req.body.hasura_userid};

		var sponsor = req.body.sponsor
		var restaurant_city = req.body.restaurant_city
		var rest_hastags = req.body.rest_hastags
		var hash_array = rest_hastags.split(',')
		var city_array = restaurant_city.split(',')
		console.log(hash_array.length)
		var sponsor_array	 = sponsor.split(',')
		var text ='{"type" : "select","args":{"table":"tbl_restaurants",'
		text=text+'"columns":["*.*"],'
		text=text+'"where": {';

		if (sponsor.length!=0) {
			var sponsor_array_values="";
			for(var i=0;i<sponsor_array.length;i++)
			{	
				console.log(i)
				if (i>0) {
					sponsor_array_values=sponsor_array_values+',';
				}
				sponsor_array_values=sponsor_array_values+'"'+sponsor_array[i]+'"';
			}
			text=text+'"restaurant_sponsor":{"sponsor_name":{ "$in":['+sponsor_array_values+']},"tbl_user_profileunique_id": {"$eq":"'+req.body.tbl_user_profileunique_id+'"}}';
		}
		if (restaurant_city.length!=0) {
			if (sponsor.length!=0) {
				text=text+",";
			}
			text=text+'"city":{ "$in":["'+restaurant_city+'"]}';
		}
		console.log(text)
		if (rest_hastags.length!=0) {
			if (sponsor.length!=0 || restaurant_city.length!=0) {
				text=text+",";
			}
			var hash_array_values="";
			for(var k=0;k<hash_array.length;k++)
				{	if (k>0) {
					hash_array_values=hash_array_values+',';
				}
				hash_array_values=hash_array_values+'"'+hash_array[k]+'"';
			}
			console.log(hash_array_values)
			text=text+'"hashtag":{ "$in":['+hash_array_values+']}';
		}
		text=text+"}";
		text = text+',"limit":'+5+',"offset":'+req.body.offset
		text=text+"}}";
		console.log(text)
		var obj = JSON.parse(text);
		console.log(obj)
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': req.body.hasura_userid},
			json:obj
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				require('.././https/temp_hasura_post')(req,res,type,url,head,body);
			}
		});
	});
}