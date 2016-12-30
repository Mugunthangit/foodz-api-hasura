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
    require('./sponsor/sponsor_tickets_list')(app);
    require('./web/restaurant/create')(app);
    require('./web/restaurant/edit')(app);
    require('./web/restaurant/create_hash_tag')(app);
    require('./web/restaurant/create_image')(app);
    require('./web/restaurant/create_menu')(app);
    require('./web/restaurant/create_cusine')(app);
    require('./web/restaurant/create_news')(app);
    require('./web/restaurant/create_campaign')(app);
    require('./web/ticket_setup/create')(app);
    require('./restaurants/restaurant_menu')(app);
    require('./restaurant_news/rest_news')(app);
    require('./restaurant_news/lookup')(app);
    require('./user_settings/user_settings_insert')(app);
    require('./user_settings/user_settings_edit')(app);


}