var request = require('request');
var bookmark_value = require('./bookmark_value');

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
			var injected_response_data = body;
			var user_unique_id = req.body.unique_id;
			var hasura_user_id = req.body.hasura_userid;
			localStorage.setItem("user_unique_id", user_unique_id);
			localStorage.setItem("hasura_user_id", hasura_user_id);
			injected_response_data.forEach( function (arrayItem)
			{
				var x = arrayItem
				var restaurant_unique_id = x.unique_id;
				var user_unique_id = localStorage.getItem('user_unique_id');
				var hasura_user_id = localStorage.getItem('hasura_user_id');
				bookmark_value(restaurant_unique_id,x,user_unique_id,hasura_user_id);
				x['food_type'] = 'chinese';
				x['food_discount'] = '10%';
				x['is_sponsered'] = false;
				x['restaurant_trendscore'] = 'high';
				x['trend_image_url'] = 'http://citizenactionny.org/wp-content/uploads/2013/05/cup-of-coffee.jpg';
				x['restaurant_image'] = [{"unique_id":"123","image_url":"http://www.vidteq.com/chennai/jpg/vt/vtieiDOVTTQITCIDVECDP.jpg"},
				{"unique_id":"1234","image_url":"http://www.vidteq.com/chennai/jpg/vt/vtieiDOVTTQITCIDVECDP.jpg"},
				{"unique_id":"12345","image_url":"http://www.vidteq.com/chennai/jpg/vt/vtieiDOVTTQITCIDVECDP.jpg"}];	
				x['recommended_by'] = [{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"},
				{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"},
				{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"},
				{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"},
				{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"},
				{"unique_id":"145551151823","nickname":"mockusername","users_hash_tag_csv":"#sushi, #veg","facebook_id":"1","img_url":"http://media.tumblr.com/tumblr_m0rwptJAEz1qm0omn.jpg"}
				];
			});
			console.log(injected_response_data)
  			setTimeout(function() {
				    res.send(response.statusCode,injected_response_data);
				    console.log('after response','---------------------------------------');
				    return true;
				}, 3000);
			

		}
	});
}



