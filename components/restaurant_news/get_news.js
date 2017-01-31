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
			users_hash_array = body[0].users_hash_tag_csv.split(",");
			request({
				url: url,
				method: type,
				headers: head,
				json: {
				  "type" : "select",
				  "args" : {
				    "table" : "tbl_restaurant_news",
				    "columns" : ["*"],
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
	});
}