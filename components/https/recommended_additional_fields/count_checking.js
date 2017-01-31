var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id, user_unique_id,hasura_user_id){
	function req_var(callback){
		request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
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
				var count = body.length
				request({
	        	url: 'http://data.hasura/v1/query',
				method: 'POST',
				headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
				json: {
				  "type" : "select",
				  "args" : {
				    "table" : "tbl_restaurants",
				    "columns": ["conversion_count"],
				    "where": {"unique_id": restaurantsunique_id}
				  }
				}
				}, function(error, response, body){
				if(error) {
					console.log(error);
				} else 
				{
					var conv_count = body[0].conversion_count
					if (count >= conv_count){
						callback(true)
					}
					else {
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