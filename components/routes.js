module.exports = function(app){
	require('./root')(app);
	require('./user_profile/create_profile')(app);
	require('./user_profile/edit_profile')(app);
	require('./restaurants/trending')(app);
	require('./restaurants/bookmarked')(app);
	require('./restaurants/popular_among_my_friends')(app);
	require('./restaurants/recommended_by_me')(app);
	require('./restaurants/recommended_to_me')(app);
}