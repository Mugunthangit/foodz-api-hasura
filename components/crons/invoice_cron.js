var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
var invoice_for_count = require('./callbacks/invoice_for_count');
var invoice_tax = require('./callbacks/invoice_tax');
module.exports = function(app){
	app.post("/create_invoice", function(req, res) {
		request({
			url: 'http://data.hasura/v1/query',
			method: 'POST',
			headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
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
					var previoudate = new Date();
					var currentdate = new Date();
					previoudate.setDate(currentdate.getDate()-1);
					request({
						url: 'http://data.hasura/v1/query',
						method: 'POST',
						headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
						json: {
							"type" : "select",
							"args" : {
								"table" : "tbl_user_subscription",
								"columns": ["*"],
								"where": {"tbl_restaurantsunique_id": restaurant.unique_id,"is_current": true,"subscription_end_date": {"$lte" : previoudate}}
							}
						}
					}, function(error, response, subs_body){
						if(error) {
							console.log(error);
						} else {
							if (subs_body.length == 1) {
								var callback_obj = {};
								invoice_for_count(app,callback_obj,subs_body[0].tbl_restaurantsunique_id);
								invoice_tax(app,callback_obj);
								setTimeout(function() {
                var invoice_amount = callback_obj.invoice_for_count*subs_body[0].ticket_cost;
                var tax_amount = callback_obj.invoice_for_count*subs_body[0].ticket_cost*callback_obj.tax_percentage/100;
                var invoice_total = invoice_amount+tax_amount;
								request({
									url: 'http://data.hasura/v1/query',
									method: 'POST',
									headers: {'Content-Type':'application/json','X-Hasura-Role':'admin','X-Hasura-User-ID': 1},
									json: {
										"type" : "insert",
										"args" : {
											"table" : "tbl_invoice",
											"returning": ["id","unique_id","tbl_user_profileunique_id","tbl_restaurantunique_id","description","invoice_for_count","invoice_amount","tbl_master_taxunique_id",
											"tax_amount","invoice_total","tbl_master_currencyunique_id","invoice_from_date","invoice_to_date","note","tbl_master_invoice_statusunique_id","created_at",
											"modified_at","invoice_no"],
											"objects": [
											{"unique_id": uuid.v1(),
											"tbl_user_profileunique_id": restaurant.tbl_user_profileunique_id,
											"tbl_restaurantunique_id": restaurant.unique_id,
											"description": "Invoice For Subscription",
											"invoice_for_count": callback_obj.invoice_for_count,
											"invoice_amount": ""+invoice_amount+"",
											"tbl_master_taxunique_id": ""+callback_obj.tbl_master_taxunique_id+"",
											"tax_amount": ""+tax_amount+"",
											"invoice_total":""+invoice_total+"",
											"tbl_master_currencyunique_id":"JHGGF001",
											"invoice_from_date":subs_body[0].created_at,
											"invoice_to_date": new Date(),
											"note": "",
											"tbl_master_invoice_statusunique_id":"INVOICE001",
											"created_at": new Date(),
											"modified_at": new Date(),
											"invoice_no": uuid.v4()}
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
								}, 3000);
							}
						}
					});
				});
				res.send(response.statusCode, rest_body)
			}
		});
	});
}
