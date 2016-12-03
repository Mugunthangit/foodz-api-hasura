var express = require("express");
var app = express();
require('./components/routes')(app);
app.listen(4000);
console.log("Running in port 4000")