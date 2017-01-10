var request = require('request');
module.exports = function(req,res,type,url,head,body){
	console.log(head)
	request({
		url: url,
		method: type,
		headers: head,
		json: body
	}, function(error, response, body){
		if(error) {
			console.log(error);
			res.send(error)
		} else {
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
					console.log(response.statusCode, body);
					res.send(response.statusCode, body)
				}
			});
		}
	});
}