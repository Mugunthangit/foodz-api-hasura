var request = require('request');
module.exports = function(req,res,type,url,head,body){
	console.log(head)
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			var injected_response_data = body;
			injected_response_data.forEach( function (arrayItem)
			{
			    var x = arrayItem
			    		x['food_type'] = 'chinese';
						x['food_discount'] = '10%';
						x['is_bookmarked'] = false;
						x['is_sponsered'] = false;
						x['restaurant_trendscore'] = 'high';
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
			    console.log(x);
			});
			console.log(injected_response_data)
			res.send(response.statusCode,injected_response_data)
		}
	});
}



