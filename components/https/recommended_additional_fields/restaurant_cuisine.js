var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id){
	function req_var(callback){
		request({
        	url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
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
						url: 'https://data.foodz.fr/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
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