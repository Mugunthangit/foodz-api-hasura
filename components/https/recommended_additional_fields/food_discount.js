var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id){
	function req_var(callback){
		request({
        	url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_restaurant_campaign",
			    "columns": ["unique_id"],
			    "where": {"tbl_restaurantsunique_id": "08cf7e71-0c3f-4409-a469-25d6e9f41931" }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else 
			{
				body.forEach(function (camp_values)
				{
					var rest_camp_id = camp_values.unique_id
					var d = new Date();
					var weekday = new Array(7);
					weekday[0] = "sunday";
					weekday[1] = "monday";
					weekday[2] = "tuesday";
					weekday[3] = "wednesday";
					weekday[4] = "thursday";
					weekday[5] = "friday";
					weekday[6] = "saturday";

					var today = weekday[d.getDay()]; 

					var date = new Date();
					var hours = date.getUTCHours();
					console.log(rest_camp_id, today)

					if (hours >= 15) {
					request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
						json: 
						{
							"type" : "select",
							"args" : 
							{
								"table" : "tbl_retaurant_tickets_setup",
								"columns": ["bonus_value","ticket_value"],
								"where": {"tbl_restaurant_campaignunique_id": rest_camp_id,"weekday":today, }
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
							console.log(body)
							console.log(hours)
							// callback(body[0])
							console.log("current_time")
				  			
						}
					});		
					}
					 else if (hours < 15) {
					request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','Authorization':'Bearer 5a8lqgvms1un9dlmfsvhgt2m56dhuc3m'},
						json: 
						{
							"type" : "select",
							"args" : 
							{
								"table" : "tbl_retaurant_tickets_setup",
								"columns": ["bonus_value","ticket_value"],
								"where": {"tbl_restaurant_campaignunique_id":rest_camp_id,"weekday":today, }
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
							console.log(body)
							console.log(hours)
							// callback(body[0])
							console.log("expired_time")
				  			
						}
					});	
					}
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