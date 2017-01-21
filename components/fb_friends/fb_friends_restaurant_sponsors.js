var request = require('request');
require('dotenv').config()

module.exports = function(app,callback_obj,restaurantsunique_id, user_profile_unique_id){
	function req_var(callback){
		request({
        	url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_restaurant_sponsors",
			    "columns": ["*"],
			    "where": {"tbl_restaurantsunique_id": restaurantsunique_id,"tbl_user_profileunique_id": user_profile_unique_id}
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
  			callback(body)
			}
		});
	}
var myCallback = function(restaurant_sponsor) {
	callback_obj['restaurant_sponsor_value'] = restaurant_sponsor;
	return restaurant_sponsor
};
req_var(myCallback);
}