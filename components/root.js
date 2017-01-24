var myParser = require("body-parser");
var express = require("express");

require('dotenv').config()

module.exports = function(app){
	app.use(myParser.urlencoded({extended : true, limit: '50mb'}));
	app.use(myParser.json({limit: '50mb'}));
	// app.use(express.bodyParser({limit: '50mb'}))
	app.get("/",function(req,res){
		res.send(" Hasura api Microservice running on 4000 ")
	})
}