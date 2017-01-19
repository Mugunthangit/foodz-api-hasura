var request = require('request');
require('dotenv').config()

module.exports = function(app,callback_obj,restaurantsunique_id){
	function req_var(callback){

		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_restaurant_sponsors",
			    "columns": ["*"],
			    "where": {"tbl_restaurantsunique_id": restaurantsunique_id}
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
  			callback(body.length)
			}
		});
	}


var myCallback = function(invoice_count) {
	callback_obj['invoice_for_count'] = invoice_count;
	return invoice_count
};
req_var(myCallback);

}