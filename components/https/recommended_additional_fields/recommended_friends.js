var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id, user_unique_id){
	function req_var(callback){
		request({
        	url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_facebook_friends",
			    "columns": ["friends_tbl_user_profileunique_id2"],
			    "where": {
			    "tbl_user_profileunique_id": user_unique_id}
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else 

			{
				var array_list = []
				body.forEach(function(new_values){
					console.log(new_values.friends_tbl_user_profileunique_id2)
					if (new_values.friends_tbl_user_profileunique_id2 != null){
						array_list.push(new_values.friends_tbl_user_profileunique_id2)
					}
				})				

				var length_friends = body.length
				if (body.length != 0 )
					request({
		        	url: 'https://data.foodz.fr/v1/query',
					method: 'POST',
					headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
					json: {
					  "type" : "select",
					  "args" : {
					    "table" : "tbl_restaurant_sponsors",
					    "columns": ["tbl_user_profileunique_id"],
					    "where": { "tbl_user_profileunique_id": { "$in": array_list }, 
					    "tbl_restaurantsunique_id": restaurantsunique_id
					   
					    }
					}
					}
					}, function(error, response, sponsorreponse){
					if(error) {
						console.log(error);
					} else 
					{
						console.log("======================================")
						console.log(sponsorreponse)
						var sponsored_array = []
						sponsorreponse.forEach(function(sponsor_user_data){
							console.log(sponsor_user_data.tbl_user_profileunique_id)
							if (sponsor_user_data.tbl_user_profileunique_id != null){
								sponsored_array.push(sponsor_user_data.tbl_user_profileunique_id)
							}

						})		
						
							request({
				        	url: 'https://data.foodz.fr/v1/query',
							method: 'POST',
							headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
							json: {
							  "type" : "select",
							  "args" : {
							    "table" : "tbl_user_profile",
							    "columns": ["first_name","last_name","profile_picture","facebook_profile","fb_friend_name", 
							    		   {"name":"user_setting","columns":["users_hash_tag_csv"]}],
							    "where": { "unique_id": { "$in": sponsored_array }
							   
							    }
							}
							}
							}, function(error, response, user_response_body){
							if(error) {
								console.log(error);
							} else 
							{
								console.log("======================================")
								callback(user_response_body)
					
							}
						});

						// callback(sponsorreponse)
			
					}
				});
		}
	});
}


var myCallback = function(recommend_friend) {
	x['recommended_by'] = recommend_friend;
	return recommend_friend
};

req_var(myCallback);
}
