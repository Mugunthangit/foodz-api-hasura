var request = require('request');
require('dotenv').config()
module.exports = function(res_arrayItem){
	function req_var(callback){
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
			json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_restaurant_sponsors",
			    "columns" : ["*"],
			    "where": {"tbl_restaurantsunique_id": res_arrayItem.unique_id,"tbl_master_ticket_statusunique_id": "TICKET002"}
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
var myCallback = function(ratio) {
  ratio_value_den = res_arrayItem.no_of_seats*14
  ratio_value = Math.round(ratio/ratio_value_den);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(ratio_value);
	res_arrayItem['ratio'] = ratio_value;
	return ratio
};
req_var(myCallback);

}