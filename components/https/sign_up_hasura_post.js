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
			res.send(response.statusCode,error)
		} else {
			if (body.user) {
				request({
					url: 'http://auth.hasura/admin/user/assign-role',
					method: type,
					headers: head,
					json: {
						"hasura_id": body.user.id,
						"role": req.body.role
					}
				}, function(error, response, body){
					if(error) {
						console.log(error);
					} else {
						res.send(response.statusCode, body)
					}
				});
			}
			else {
				res.send(response.statusCode, body)
			}
		}
	});
}