var request = require('request');
if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}


module.exports = function(restaurant_unique_id,x,user_unique_id,hasura_user_id){
function req_var(callback){
request({url: 'http://data.hasura/v1/template/tbl_user_favorite_list?tbl_user_profileunique_id='+user_unique_id,
	method: 'GET',
	headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': hasura_user_id}
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

    	var bookmarked_condition = isInArray(restaurant_unique_id,new_array);
		// var bookmarked_condition = new_array.includes(restaurant_unique_id);
		console.log('^^^^^^^^^^^^^^')
		console.log(bookmarked_condition);
		callback(bookmarked_condition)
	}
});	
}

var myCallback = function(data) {
	console.log('got data: '+data);
	x['is_bookmarked'] = data;
	console.log(x['is_bookmarked'],"===============")
	console.log(x);
};
req_var(myCallback);
   
}