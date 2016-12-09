var request = require('request');
var jp = require('jsonpath');
var shortid = require('shortid');

module.exports = function(app){
app.post("/unique", function(req, res) {
request({
	url: 'https://data.oologic14.hasura-app.io/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','Authorization': 'Bearer g5vhfx1i5r77kci3b9ebz80jyw5zv7d6'},
	json: {
	  "type" : "select",
	  "args" : {
	    "table" : "tbl_restaurant_sponsors",
	    "columns": ["ticket_code"]
	  }
	}
}, function(error, response, body){
	if(error) {
		console.log(error);
	} else {
		console.log(response.body);
		var array_data = jp.query(response.body, '$..ticket_code');
		var unique_id_value = shortid.generate();
		var condition_value = array_data.includes(unique_id_value);
		res.send(condition_value)
		if(condition_value){
			console.log('callbck the same function')
		} else{
			console.log('inside if condition unique value return')
			return unique_id_value
		}
	}
});
});
}