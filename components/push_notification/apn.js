var apn = require('apn');
require('dotenv').config()

var tokens = ["fa65c92002a327372805e6f71a3b30fdcd4ee7c202ac898c800f246a72a4df75"];

var service = new apn.Provider({
  cert: "certificates/foodz_cer_dev.pem",
  key: "certificates/foodz_key_dev.pem",
});

var note = new apn.Notification({
	alert:  "Breaking News: I just sent my first Push Notification",
	badge:1
});

// The topic is usually the bundle identifier of your application.
note.topic = "com.Foodz.app";

console.log("Sending: ${note.compile()} to ${tokens}");
service.send(note, tokens).then( result => {
    console.log("sent:", result.sent);
    console.log("failed:", result.failed.length);
    console.log(result.failed);
});


// For one-shot notification tasks you may wish to shutdown the connection
// after everything is sent, but only call shutdown if you need your 
// application to terminate.
service.shutdown();
