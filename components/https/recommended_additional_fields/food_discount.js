var request = require('request');
require('dotenv').config()

module.exports = function(x,restaurantsunique_id){
	function req_var(callback){
		var weekday=new Array(7);
		weekday[0]="sunday";
		weekday[1]="monday";
		weekday[2]="tuesday";
		weekday[3]="wednesday";
		weekday[4]="thursday";
		weekday[5]="friday";
		weekday[6]="saturday";
		var d=new Date();
		console.log("Today is " + weekday[d.getDay()]);
		var today_name_value = d.getDay();
		request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
				"type" : "select",
				"args" : {
					"table" : "tbl_restaurant_campaign",
					"columns" : [{"name":"retaurant_tickets_setup","columns":["weekday","bonus_value","ticket_value"],
					"where": {"weekday": weekday[d.getDay()]}}],
					"where": {"tbl_restaurantsunique_id": restaurantsunique_id,"is_active": true}
				}
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
				var date = new Date();
				var hours = date.getUTCHours();
				console.log(body)
				console.log("++++++++++++++body data")
				if (hours <= 15) {
					callback(body)
				}
				else {
					callback(body)
				}
			}
		})
		
	}
	var myCallback = function(food_discount_value) {
			x['food_discount'] = food_discount_value;
			console.log(food_discount_value)
			return food_discount_value
		};
	req_var(myCallback);
}
