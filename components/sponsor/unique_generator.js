var request = require('request');
var jp = require('jsonpath');
var shortid = require('shortid');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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
		var array_data = jp.query(response.body, '$..ticket_code');
		function makeid()
		{
		    var text = "";
		    var possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

		    for( var i=0; i < 9; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}

		var unique_id_value =  makeid();
		function isInArray(value, array) {
			return array.indexOf(value) > -1;
		}
		var condition_value = isInArray(unique_id_value, array_data);
		var var_inside_condition_method = inside_condition_method(condition_value,unique_id_value);
        return var_inside_condition_method;
	}
}

module.exports = function(app,hasura_userid,callback){
	request({
		url: 'http://data.hasura/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_userid},
		json: {
			"type" : "select",
			"args" : {
				"table" : "tbl_restaurant_sponsors",
				"columns": ["ticket_code"]
			}
		}
	}, function(error, response, body){
		var var_condtion_method = condtion_method(error, response, body);
		console.log(var_condtion_method);
		console.log('----------');
		localStorage.setItem("ticket_code_value", var_condtion_method);
    	console.log(localStorage.getItem('ticket_code_value'));

		return localStorage.getItem('ticket_code_value');
	});
	if(localStorage.getItem('ticket_code_value')){
		return localStorage.getItem('ticket_code_value');
	}
}
