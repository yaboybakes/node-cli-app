const keys = require('./keys.js');
const Twitter = require('twitter');
const request = require('request');
const fs = require('fs');

var getMyTweets = function() {
    var client = new Twitter(keys.twitterK eys);

    var params = {screen_name: 'your-twitter-name'};
    client.get('statuses/user_timeline',params,function(error,tweets,response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log(' ');
          console.log(tweets[i].text);
        }
      }
    });
}

var getMeSpotify = function(songName) {
  spotify.search({ type: 'track', query: songName}, function(err,data) {
    if (err) {
      console.log('Error occured: ' + err);
    }

    //console.log(data.tracks.items[0]);
    var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistsNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('--------------------------------------');
      }
  });
}

var getMeMovie = function(movieName) {
  request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function(error,response,body) {
    if (!error && response.statusCode == 200) {
      var jsonData = JSON.parse(body);
      console.log('Title: ' + jsonData.Title);
      console.log('Year: ' + jsonData.Year);
      console.log('T-Rated: ' + jsonData.tomatoRating)
    }
  })
}

var doWhatItSays = function() {
  fs.readFile('random.txt','utf8',function(err,data) {
    if (err)
    throw err;
    var array = data.split(',');

    if (array.length == 2) {
      pick(array[0],array[1]);
    } else if (array.length == 1) {
      pick(array[0]);
    }
  });
}

var pick = function(caseData, functionData) {
  switch(caseData) {
    case 'my-tweets' :
      getMyTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log("LIRI does not know that command");
  }
}

var runThis = function(argOne, argTwo) {
    pick(argOne,argTwo);
}

runThis(process.argv[2].process.argv[3]);
