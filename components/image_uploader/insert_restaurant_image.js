var multer  =   require('multer');
var fs = require('fs');
var path = require('path');
var url = require('url');

//var request = require('request');
//var myParser = require("body-parser");
//var uuid = require('node-uuid');


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');


module.exports = function(app){

app.get('/api/get_image',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

}

module.exports = function(app){

app.post('/post_image',function(req,res){
    upload(req,res,function(err) {
		console.log(req.file.path)
        if(err) {
            return res.send(JSON.stringify({"error":"Error uploading file."}));
        }
        res.send(JSON.stringify({"success":"File is uploaded","status":200, "path":req.file.path}));
    });
});

}