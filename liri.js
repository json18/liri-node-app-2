require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var Twitter = require('twitter');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userSearch = process.argv[3];


var getSpotify = function(song) {
    if (song === undefined) {
        song = "The Sign"
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    //    console.log(data, "this is data"); 
    //    console.log(data.tracks, "this is the items in data");
    //    console.log("object", data.tracks.items[0].album, null, 2)
       console.log("Artist: ", data.tracks.items[0].artists[0].name)
       console.log("Name: ", data.tracks.items[0].name)
       console.log("Link to preview song: ", data.tracks.items[0].external_urls)
       console.log("Album: ", data.tracks.items[0].album.name)
      });
}


 var getTwitter = function(tweet) {
     if(process.argv[2] = "my-tweets") {
        client.get('statuses/user_timeline', function(error, tweets, response) {
            if (!error) {
            //   console.log("this is tweets", tweets);
              console.log("Tweeted", tweets[0].text, "at", tweets[0].created_at);
              // only prints out the first tweet, still need to print out up to 20
            }
          });
     }
 }

var findMovie = function(movie) {
        request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error) {
            console.log(response);
        };
      })
}

var findMovie = function(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
        console.log("this is the query URL", queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("body", JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Release Year: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
    }
    });
}

if (process.argv[2] === "spotify-this-song") {
    getSpotify(userSearch);
}

if (process.argv[2] === "my-tweets") {
    getTwitter();
}

if (process.argv[2] ==="movie-this") {
    findMovie();
}