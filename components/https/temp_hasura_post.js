var request = require('request');
require('dotenv').config()

var bookmark_value = require('./bookmark_value');
var cuisine_name = require('./recommended_additional_fields/restaurant_cuisine');
var count_checking = require('./recommended_additional_fields/count_checking')
var recommend_friends = require('./recommended_additional_fields/recommended_friends')
var food_discount = require('./recommended_additional_fields/food_discount')
var ticket_sponsor = require('./recommended_additional_fields/ticket_sponsored')



if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


module.exports = function(req,res,type,url,head,body){
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			var injected_response_data_length = body.length;
			var injected_response_data = body;
			var user_unique_id = req.body.unique_id;
			var hasura_user_id = req.body.hasura_userid;
			localStorage.setItem("user_unique_id", user_unique_id);
			localStorage.setItem("hasura_user_id", hasura_user_id);
			if (injected_response_data_length != 0) {
			injected_response_data.forEach( function (arrayItem)
			{
				var x = arrayItem
				var restaurant_unique_id = x.unique_id;
				var user_unique_id = localStorage.getItem('user_unique_id');
				var hasura_user_id = localStorage.getItem('hasura_user_id');
				x['recommended_by'] = [];
				x['use_bonus'] = true;
				x['food_type'] = "";
				bookmark_value(restaurant_unique_id,x,user_unique_id,hasura_user_id);
				cuisine_name(x,restaurant_unique_id,hasura_user_id);
				count_checking(x,restaurant_unique_id,user_unique_id,hasura_user_id)
				recommend_friends(x,restaurant_unique_id,user_unique_id,hasura_user_id)
				food_discount(x,restaurant_unique_id,hasura_user_id)
				ticket_sponsor(x,restaurant_unique_id,user_unique_id,hasura_user_id)
				x['restaurant_trendscore'] = arrayItem.trend_score;
				x['restaurant_image'] = arrayItem.banner_image
			});
		}
		 // else{
		 // 	injected_response_data = []
		 // }
  			setTimeout(function() {
				    res.send(response.statusCode,injected_response_data);
				    return true;
				}, 3000);
		}
	});
}




