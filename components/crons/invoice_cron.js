var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/create_invoice", function(req, res) {

	request({
		url: 'https://data.foodz.fr/v1/query',
		method: 'POST',
		headers: {'Content-Type':'application/json','Authorization':'Bearer 3qposupfafvcb4q2p0d7l1ufvnfxqfei'},
		json: {
		  "type" : "select",
		  "args" : {
		    "table" : "tbl_restaurants",
		    "columns": ["*"]
		  }
		}
	}, function(error, response, rest_body){
		if(error) {
			console.log(error);
		} else {

		rest_body.forEach( function (restaurant){
		console.log(restaurant.unique_id)



		request({
					url: 'https://data.foodz.fr/v1/query',
					method: 'POST',
					headers: {'Content-Type':'application/json','Authorization':'Bearer 3qposupfafvcb4q2p0d7l1ufvnfxqfei'},
					json: {
			  "type" : "select",
			  "args" : {
			    "table" : "tbl_user_subscription",
			    "columns": ["*"],
			    "where": {"tbl_restaurantsunique_id": restaurant.unique_id}
			  }
			}
		}, function(error, response, subs_body){
			if(error) {
				console.log(error);
			} else {
				console.log("=======================")
				console.log(response.statusCode, subs_body);
				if (subs_body.length == 1) {
					console.log("______________+++++++++++++++++++++++++++++++++++++++++++++++++++++")



					request({
					url: 'https://data.foodz.fr/v1/query',
					method: 'POST',
					headers: {'Content-Type':'application/json','Authorization':'Bearer 3qposupfafvcb4q2p0d7l1ufvnfxqfei'},
					json: {
				  "type" : "insert",
				  "args" : {
				    "table" : "tbl_invoice",
				    "returning": ["id","description"],
				    "objects": [
				      {"unique_id":"as45aaAAASss4","tbl_user_profileunique_id":"Profilemanager1d123","tbl_restaurantunique_id":"dafda150-6623-4d14-b907-ec9942e358bf","description":"Invoice for thalapakti","invoice_for_count":50,"invoice_amount":"1000","tbl_master_taxunique_id":"TAX001","tax_amount":"500","invoice_total":"10500	","tbl_master_currencyunique_id":"JHGGF001","invoice_from_date":"2014-01-09T07:19:45.45+00:00","invoice_to_date":"2014-01-19T07:19:45.45+00:00","note":"pay the amount asap","tbl_master_invoice_statusunique_id":"INVOICE001","created_at":"2017-01-18T07:49:03.193299+00:00","modified_at":"2017-01-09T07:49:03.193299+00:00","invoice_no":"asd5sa45d54"}
				    ]
				}
				}
					}, function(error, response, body){
						if(error) {
							console.log(error);
						} else {
							console.log(response.statusCode, body);
						}
					});




				}



			}
		});



		});
			res.send(response.statusCode, rest_body)
		}
	});


	});
}


