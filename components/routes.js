module.exports = function(app){
	require('./root')(app);
    //User Profile 
	require('./user_profile/create_profile')(app);
	require('./user_profile/edit_profile')(app);
    require('./user_profile/get_profile')(app);
    //Restaurant Trending
	require('./restaurants/trending')(app);
    //Restaurant Bookmark
	require('./restaurants/bookmarked')(app);
    //Restaurant Popular Among my Friends
	require('./restaurants/popular_among_my_friends')(app);
    //Restaurants recommended by/to me
	require('./restaurants/recommended_by_me')(app);
	require('./restaurants/recommended_to_me')(app);
    //Restaurant Sponsors
    require('./sponsor/restaurant')(app);
    //Restaurant Favourite
    require('./restaurants/favorite')(app);
    //Http Sample Response Service
    require('./https/sampleRequest')(app);
    require('./https/bookmark_condition')(app);
    //Mobile Device Information
    require('./device/device_insert')(app);
    require('./device/device_edit')(app);
    //Sponsor Ticket List
    require('./sponsor/sponsor_tickets_list')(app);
    //Restaurant Web Page Contents
    require('./web/restaurant/create')(app);
    require('./web/restaurant/edit')(app);
    require('./web/restaurant/create_hash_tag')(app);
    require('./web/restaurant/create_image')(app);
    require('./web/restaurant/create_menu')(app);
    require('./web/restaurant/create_cusine')(app);
    require('./web/restaurant/create_news')(app);
    require('./web/restaurant/create_campaign')(app);
    require('./web/ticket_setup/create')(app);
    //Restaurant Menu
    require('./restaurants/restaurant_menu')(app);
    require('./restaurants/restaurant_menu_list')(app);
    //Restaurant News
    require('./restaurant_news/rest_news')(app);
    require('./restaurant_news/lookup')(app);
    //Restaurant User Settings
    require('./user_settings/user_settings_insert')(app);
    require('./user_settings/user_settings_edit')(app);
    require('./sign_up/create_user')(app);    
    //Restaurant Suggestions
    require('./suggest_restaurant/suggest_restaurant_insert')(app);
    //Mobiel App Bug Report
    require('./bug_report/bug_report_post')(app);
    //Search and Filters
    require('./search_filter/search')(app);
    require('./search_filter/list_all_restaurant')(app);
    require('./search_filter/filter_params')(app);
    require('./search_filter/search_fb_user_friend')(app);
    require('./search_filter/search_by_hashtag')(app);
    //Api Redemption
    require('./rm_api/edit_sponsor_redeemption')(app);
    require('./rm_api/sponsor_redeemption')(app);
    //Cron Jobs
    require('./crons/samplecron')(app);
    require('./crons/invoice_cron')(app);
    require('./crons/restaurant_ratio')(app);
    require('./crons/restaurant_trending_ratio')(app);

    //my_fb_friends   
    require('./fb_friends/my_fb_friends_list')(app);
}