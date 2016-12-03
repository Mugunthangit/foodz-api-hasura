var express = require("express");
var app = express();
require('./components/root')(app);
require('./components/user_profile/create_profile')(app);
require('./components/user_profile/edit_profile')(app);
require('./components/restaurants/trending')(app);
require('./components/restaurants/bookmarked')(app);
require('./components/restaurants/popular_among_my_friends')(app);
require('./components/restaurants/recommended_by_me')(app);
require('./components/restaurants/recommended_to_me')(app);
app.listen(4000);
console.log("Running in port 4000")