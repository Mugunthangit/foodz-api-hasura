var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id, user_unique_id){
	function req_var(callback){
		request({
        	url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_restaurant_sponsors",
			    "columns": ["unique_id"],
			    "where": {"tbl_restaurantsunique_id": restaurantsunique_id,
			    "tbl_user_profileunique_id": user_unique_id,
			    "is_eligible_for_bonus": false }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else 
			{
				console.log("first_loop")
				var count = body.length
				request({
	        	url: 'https://data.foodz.fr/v1/query',
				method: 'POST',
				headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
				json: {
				  "type" : "select",
				  "args" : {
				    "table" : "tbl_restaurants",
				    "columns": ["conversion_count"],
				    "where": {"unique_id": restaurantsunique_id,
				    "tbl_user_profileunique_id": user_unique_id}
				  }
				}
				}, function(error, response, body){
				if(error) {
					console.log(error);
				} else 
				{
					var conv_count = body.length
					console.log(conv_count, count)
					console.log("second_loop")
					if (count >= conv_count){
						console.log("Use Bonus Value")
						callback(true)
					}
					else {
						console.log('Use Ticket Value')
						callback(false)
					}
				}
			});
		}
	});
}


var myCallback = function(count_status) {
	x['use_bonus'] = count_status;
	return count_status
};

req_var(myCallback);
}