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
			    "table" : "tbl_restaurant_sponsors",
			    "columns": ["unique_id"],
			    "where": {"tbl_restaurantsunique_id": restaurantsunique_id,
			    "tbl_user_profileunique_id": user_unique_id,
			    "tbl_master_ticket_statusunique_id":"TICKET001" }
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else 
			{
				if (body.length != 0){
					callback(true)

				}
				else{
					callback(false)
				}
				
		}
	});
}


var myCallback = function(sponsors) {
	x['is_sponsored'] = sponsors;
	return sponsors
};

req_var(myCallback);
}