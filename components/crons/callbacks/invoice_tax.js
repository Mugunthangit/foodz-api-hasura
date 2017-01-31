var request = require('request');
require('dotenv').config()

module.exports = function(app,callback_obj){
	function req_var(callback){

		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_master_tax",
			    "columns": ["*"],
			    "where": {"location": "France","is_active": true}
			  }
			}
		}, function(error, response, body){
			if(error) {
				console.log(error);
			} else {
  			callback(body)
			}
		});
	}


var myCallback = function(tax_details) {
	callback_obj['tbl_master_taxunique_id'] = tax_details[0].unique_id;
	callback_obj['tax_percentage'] = tax_details[0].tax_percentage;


	return tax_details
};
req_var(myCallback);

}