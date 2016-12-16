var request = require('request');
var jp = require('jsonpath');
var shortid = require('shortid');

function inside_condition_method(condition_value,unique_id_value){
	if(condition_value){
		console.log('callbck the same function')
		return '65454'
	} else{
		console.log('returns unique_id_value')
		return unique_id_value;
	}
}

function condtion_method(error, response, body){
	if(error) {
		console.log(error);
	} else {
		console.log(response.body);
		var array_data = jp.query(response.body, '$..ticket_code');
		console.log(array_data);
		var unique_id_value = shortid.generate();
		console.log(unique_id_value);

		function isInArray(value, array) {
			return array.indexOf(value) > -1;
		}
		var condition_value = isInArray(unique_id_value, array_data);
		console.log('second +++++++++++++++')
		var var_inside_condition_method = inside_condition_method(condition_value,unique_id_value);
		console.log(var_inside_condition_method);
		console.log('below condition_value')
        return var_inside_condition_method;
	}
}

function request_method(app,hasura_userid){
	request({
		url: 'https://data.oologic14.hasura-app.io/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization':'Bearer g5vhfx1i5r77kci3b9ebz80jyw5zv7d6'},
		json: {
			"type" : "select",
			"args" : {
				"table" : "tbl_restaurant_sponsors",
				"columns": ["ticket_code"]
			}
		}
	}, function(error, response, body){
		var var_condtion_method = condtion_method(error, response, body);
		console.log('========');
		console.log(var_condtion_method);
		console.log('0000000000000000000')
		return var_condtion_method;
	});
}
module.exports = function(app,hasura_userid){
	var var_request_method = request_method(app,hasura_userid);
	console.log(var_request_method);
	console.log('=======================================================================')
  return 'asdasd56';
}