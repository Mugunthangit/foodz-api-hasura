var myParser = require("body-parser");
module.exports = function(app){
	app.use(myParser.urlencoded({extended : true}));
	app.use(myParser.json());
	app.get("/",function(req,res){
		res.send("api for /create_profile")
	})
}