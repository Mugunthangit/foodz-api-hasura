var request = require('request');
require('dotenv').config()

module.exports = function(app,callback_obj,restaurantsunique_id){
	function req_var(callback){

		request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer rnwrlvqj34rg4ok1b7m3ro5449ur8kwq'},
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