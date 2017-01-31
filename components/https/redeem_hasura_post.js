var request = require('request');
require('dotenv').config()

module.exports = function(req,res,type,url,head,body){
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
				request({
					url: url,
					method: type,
					headers: head,
					json: {
					  "type" : "update",
					  "args" : {
					    "table" : "tbl_restaurant_sponsors",
					    "$set": {"tbl_master_ticket_statusunique_id": "TICKET002"},
					    "where": {
					        "ticket_code": req.body.ticket_code
					    }
					  }
					}
				}, function(error, response, body){
					if(error) {
						console.log(error);
					} else {
						console.log(body);
					}
				});
			res.send(response.statusCode, body)
		}
	});
}