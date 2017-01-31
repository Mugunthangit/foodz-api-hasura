var request = require('request');
var myParser = require("body-parser");
var uuid = require('node-uuid');
require('dotenv').config()

module.exports = function(app){
	app.post("/sign_up", function(req, res) {
		var type = 'POST'
		var url = 'http://auth.hasura/admin/user/create';
		var head = {'Content-Type':'application/json','X-Hasura-Role':'admin',
		'X-Hasura-User-ID': 1};
		var body = {
			  "username": req.body.username,
			  "password": req.body.password,
			  "email": req.body.email,
			  "mobile": req.body.mobile
			}
    require('.././https/sign_up_hasura_post')(req,res,type,url,head,body);
	});
}