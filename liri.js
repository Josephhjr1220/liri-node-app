var request = require('request');
var fs = require('fs');
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys.js');
var argument = process.argv[2];

if(argument === "my-tweets"){
    getTweets();
}
else if(argument === "movie-this"){
    movieInfo();
}
else if(argument === "spotify-this-song"){
    findSong();
}

// Twitter
function getTweets(){

  var client = new Twitter(keys.twitterKeys);

  var params = { screen_name: 'joejoes_dojo', count: 10};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      for (var i = 0; i < tweets.length; i++) {
        if (!error) {
            console.log("Date: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log("======================");

        }
      }
    });
  };

//OMDB
function movieInfo(){

    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true",function (error, response, body){
        
        if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Country " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
    
        } 
     }); 
}

// Spotify
function findSong(){
    
     var songRequest = process.argv[3];

     if (songRequest === undefined){
                songRequest = "The Sign Ace of Base"
    }

     spotify.search({ type: 'track', query: songRequest }, function(err, data) {

            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }     
            var spotifyResponse = data.tracks.items;

                console.log("Artist: " + spotifyResponse[0].artists[0].name)
                console.log("Song: " + spotifyResponse[0].name)
                console.log("Link: " + spotifyResponse[0].album.external_urls.spotify)
                console.log("Album: " + spotifyResponse[0].album.name)
    });
};

//Read Text File
if(argument === "do-what-it-says"){
    fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
    });
}   