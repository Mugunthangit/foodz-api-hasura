var express = require("express");
var app = express();
require('./components/root')(app);
require('./components/create_profile')(app);
app.listen(4000);
console.log("Running in port 4000")