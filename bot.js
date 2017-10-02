var img = 0;
var Twit = require('twit');
var exec = require("child_process").exec;
var fs = require("fs");


var T = new Twit({
	consumer_key:         'nope',
	consumer_secret:      'nope',
	access_token:         'nope',
	access_token_secret:  'nope'
});

tweetIt();
setInterval(tweetIt, (1 * 1000) * 60)

//tweetIt("Hello, this is yet another test!");
function tweetIt() {
	//Uncomment for linux/macOS
	//cmd = "processing-java --skecth=`pwd`/random_img --run";
	//Uncomment for windows
	cmd = "processing-java --sketch=%cd%/random_img --run";
	exec(cmd, processing);
	function processing() {
		var filename = "random_img/output.jpg";
		var params = {
			encoding : 'base64'
		}
	
		var b64 = fs.readFileSync(filename, params)

		T.post("media/upload", {media_data: b64}, uploaded)

		function uploaded(err, data, response) {
			img += 1;
			var id = data.media_id_string;
			var tweet = {
				status: "This is image #" + img,
				media_ids: [id]
			}
			T.post('statuses/update', tweet, tweeted);
		}
	}
}

function tweeted(err, data, response) {
	if (err) {
		console.log("Something wrent wrong! \n" + err)
	} else {
		console.log("Sucess!" + "(image #" + img + ")")
	}
}
