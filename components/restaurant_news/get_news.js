var request = require('request');
require('dotenv').config()

module.exports = function(req,res,type,url,head,body){
	var date = new Date();
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			if (body.length != 0){
				console.log(body.length)
				console.log(body)
				users_hash_array = body[0].users_hash_tag_csv.split(",");
				console.log(users_hash_array)
				request({
					url: url,
					method: type,
					headers: head,
					json: {
					  "type" : "select",
					  "args" : {
					    "table" : "tbl_restaurant_news",
					    "columns" : ["id","unique_id","tbl_restaurantsunique_id","news_info","news_image_url","visibility_start_date","visibility_end_date",
					    "is_approved","news_url","created_at","modified_at",{"name": "news_restaurant", "columns": ["restaurant_name"]}
					      ],
					    "where": {
						    "is_approved": true,
						    "visibility_start_date": { "$lt": date },
						    "visibility_end_date": { "$gt": date },
						    "news_restaurant":{"restaurant_hashtag": {"hashtag": { "$in": users_hash_array }}}
					  	}
					  }
					}
				}, function(error, response, news_body){
					if(error) {
						console.log(error);
					} else {
						res.send(response.statusCode, news_body)
					}
				});
			}
			else{
				res.send([])
			}
		}
	});
}