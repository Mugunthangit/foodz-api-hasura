//Import the necessary libraries/declare the necessary objects
var express = require("express");
var myParser = require("body-parser");
var request = require('request');

var app = express();
  app.use(myParser.urlencoded({extended : true}));
  app.use(myParser.json());
  app.get("/",function(req,res){
  	res.send("api for /create_profile")
  })
  app.post("/create_profile", function(req, res) {
  	  console.log(req.headers.authorization);
      console.log(req.body); //This prints the JSON document received (if it is a JSON document)
			request({
				    url: 'https://data.oologic14.hasura-app.io/v1/query', //URL to hit
				    method: 'POST',
				    //Lets post the following key/values as form
			  	  headers: {'Content-Type':'application/json','Authorization': req.headers.authorization},
				    json: {
					  "type" : "insert",
					  "args" : {
					    "table" : "tbl_user_profile",
			        "returning": ["id","hasura_userid","unique_id","first_name","last_name","profile_picture","email","mobile_no","tbl_master_profile_statusunique_id","facebook_profile"],
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
  });
//Start the server and make it listen for connections on port 8080
app.listen(4000);
console.log("Running in port 4000")