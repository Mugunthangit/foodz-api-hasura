var myParser = require("body-parser");
require('dotenv').config()

module.exports = function(app){
	app.use(myParser.urlencoded({extended : true}));
	app.use(myParser.json());
	app.get("/",function(req,res){
		res.send(" Hasura api Microservice running on 4000 ")
	})
}