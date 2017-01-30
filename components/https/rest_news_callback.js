var request = require('request');
require('dotenv').config()

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./rest_news');
}


module.exports = function(restaurant_unique_id,x,user_unique_id,hasura_user_id){
function req_var(callback){
request({url: 'http://data.hasura/v1/query/tbl_restaurant_news?unique_id='+user_unique_id,
	method: 'GET',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
}, function(error, response, body){
	if(error) {
		console.log(error);
	} else {
		var restaurant_list_res = JSON.parse(body);
		var new_array = [];
		restaurant_list_res.forEach( function (arrayItem){
			new_array.push(arrayItem.tbl_restaurantsunique_id)
		});
		function isInArray(value, array) {
		  return array.indexOf(value) > -1;
		}
    	var rest_news_array = isInArray(restaurant_unique_id,new_array);
		callback(new_array)
		}
	});	
}

var myCallback = function(data) {
	x['rest_news_added'] = data;
};
req_var(myCallback);  
}