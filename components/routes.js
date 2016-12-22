module.exports = function(app){
	require('./root')(app);
	require('./user_profile/create_profile')(app);
	require('./user_profile/edit_profile')(app);
	require('./restaurants/trending')(app);
	require('./restaurants/bookmarked')(app);
	require('./restaurants/popular_among_my_friends')(app);
	require('./restaurants/recommended_by_me')(app);
	require('./restaurants/recommended_to_me')(app);
    require('./sponsor/restaurant')(app);
    require('./restaurants/favorite')(app);
    require('./https/sampleRequest')(app);
    require('./https/bookmark_condition')(app);
    require('./device/device_insert')(app);
    require('./device/device_edit')(app);

}