var express = require("express");
var app = express();
require('./components/root')(app);
require('./components/user_profile/create_profile')(app);
require('./components/user_profile/edit_profile')(app);
require('./components/restaurents/trending_restaurents')(app);
app.listen(4000);
console.log("Running in port 4000")