var request = require('request');
require('dotenv').config()

module.exports = function(app,callback_obj){
	function req_var(callback){

		request({
			url: 'https://data.foodz.fr/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','Authorization':'Bearer rnwrlvqj34rg4ok1b7m3ro5449ur8kwq'},
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
	console.log("*************")
	console.log(tax_details);
	callback_obj['tbl_master_taxunique_id'] = tax_details[0].unique_id;
	callback_obj['tax_percentage'] = tax_details[0].tax_percentage;


	return tax_details
};
req_var(myCallback);

}