var request = require('request');
module.exports = function(req,res,type,url,head,body){
	console.log(head)
	request({
		url: url,
		method: type,
		headers: head,
		json: {
			"type" : "insert",
			"args" : {
				"table" : "tbl_user_profile",
				"returning": ["id","hasura_userid","unique_id","first_name","last_name","profile_picture","tbl_master_profile_statusunique_id","facebook_profile"],
				"objects": [
				{"hasura_userid" : req.body.hasura_userid, "unique_id": req.body.unique_id,"first_name":req.body.first_name,
				"last_name": req.body.last_name,"profile_picture":req.body.profile_picture,
				"email":req.body.email,"mobile_no":req.body.mobile_no,"tbl_master_profile_statusunique_id":req.body.tbl_master_profile_statusunique_id,
				"facebook_profile":req.body.facebook_profile}
				]
			}
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