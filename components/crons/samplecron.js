var schedule = require('node-schedule');
module.exports = function(){
	schedule.scheduleJob('* * * * * *', function(){
	  // console.log('Welcome to foodz');
	});
}