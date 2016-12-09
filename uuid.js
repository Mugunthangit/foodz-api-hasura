var request = require('request');
var jp = require('jsonpath');


request({
	url: 'https://data.oologic14.hasura-app.io/v1/query',
	method: 'POST',
	headers: {'Content-Type':'application/json','Authorization': 'Bearer 103vzsq5enh1yp2glkqfiuaw1z6ie6cn'},
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
		console.log(array_data)
		var condition_value = array_data.includes("FOODZ-HJPx73UQg");
		console.log(condition_value);
	}
});