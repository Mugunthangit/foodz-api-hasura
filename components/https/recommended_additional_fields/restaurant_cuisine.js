var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id,hasura_user_id){
	function req_var(callback){
		request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_retaurant_cusine",
			    "columns": ["tbl_master_cuisineunique_id"],
			    "where": {"tbl_restaurantsunique_id": restaurantsunique_id }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else 
			{
				body.forEach(function (cuisine_values)
				{
					var rest_cuisine = cuisine_values.tbl_master_cuisineunique_id
					request(
					{
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id},
						json: 
						{
							"type" : "select",
							"args" : 
							{
								"table" : "tbl_master_cuisine",
								"columns": ["cuisine_name"],
								"where": {"unique_id": rest_cuisine,"is_active":true}
							}
						}
					}, 
					function(error, response, body)
					{
						if(error) 
						{
							console.log(error);
						} 
						else 
						{
							callback(body[0].cuisine_name)
				  			
						}
					});
				})
			}
	});
}

var myCallback = function(cuisine_values_obj) {
	x['food_type'] = cuisine_values_obj;
	return cuisine_values_obj
};

req_var(myCallback);
}