var express = require("express");
var app = express();
require('./components/routes')(app);
require('./components/device/device_edit')(app);
require('./components/device/device_insert')(app);
app.listen(4000);
console.log("Running in port 4000")