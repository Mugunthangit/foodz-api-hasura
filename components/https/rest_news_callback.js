var request = require('request');
if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./rest_news');
}


module.exports = function(restaurant_unique_id,x,user_unique_id,hasura_user_id){
function req_var(callback){
request({url: 'https://data.oologic14.hasura-app.io/v1/query/tbl_restaurant_news?unique_id='+user_unique_id,
	method: 'GET',
	headers: {'Content-Type':'application/json','Authorization': 'Bearer 0u1bwfbp6uxbjn6fhmthg32kp54of2te'},
}, function(error, response, body){
	if(error) {
		console.log(error);
	} else {
		var restaurant_list_res = JSON.parse(body);
		console.log(body)
		console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj")
		var new_array = [];
		restaurant_list_res.forEach( function (arrayItem){
			new_array.push(arrayItem.tbl_restaurantsunique_id)
		});
		function isInArray(value, array) {
		  return array.indexOf(value) > -1;
		}
    	var rest_news_array = isInArray(restaurant_unique_id,new_array);
		console.log('^^^^^^^^^^^^^^')
		console.log(rest_news_array);
		callback(new_array)
		}
	});	
}

var myCallback = function(data) {
	console.log('got data: '+data);
	x['rest_news_added'] = data;
	console.log(x['rest_news_added'],"===============")
	console.log(x);
};
req_var(myCallback);  
}