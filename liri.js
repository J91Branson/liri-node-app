var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var inputString = process.argv;


function search (operand, name) {
if (operand === "movie-this") {

    

    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
       function(response) {
           // Then we print out the imdbRating
           console.log("The title is: " + response.data.Title);
           console.log(name + " was released in " + response.data.Year);
           console.log("IMDB rated " + name + " a " + response.data.imdbRating);
           console.log("Rotten Tomatoes rated " + name + " a " + response.data.Metascore);
           console.log(name + " was made in " + response.data.Country);
           console.log(name + " is in " + response.data.Language);
           console.log("The plot is: " + response.data.Plot);
           console.log("Actors: " + response.data.Actors);
       }
       );
   }

   else if (operand === "concert-this") {

     

     
                
               
      axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
        function (response) {
          for (var i = 0; i < response.data.length; i++) {
              console.log(name + " is coming to " +
                  response.data[i].venue.name + " in " +
                  response.data[i].venue.city + ", " +
                  response.data[i].venue.region + " on " +
                  moment(response.data[i].datetime).format("dddd, MMMM Do YYYY"));
          }
      });
}

else if (operand === "spotify-this-song") {

  

  
   console.log(name);
   var spotify = new Spotify(
    keys.spotify
 );
   
  spotify.search({ type: 'track', query: name }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    console.log("artist:" + data.tracks.items[0].artists[0].name);
    console.log("Song title: " + data.tracks.items[0].name);
    console.log("Preview the song at: " + data.tracks.items[0].href);
    console.log("This song is on the album: " + data.tracks.items[0].album.name);
});
}

if (operand === "do-what-it-says") {
  name = ""

     
  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data)
      // search(data.split);
      var splitString = data.split(",");
      console.log(splitString);
     var command  = splitString[0];
      var name =  splitString[1];
      search(command,name);
  });
}
}
var operand = inputString[2];
var name = "";
for (var i = 3; i < inputString.length; i++) {

  if (i > 3 && i < inputString.length) {
    name = name + " " + inputString[i];
  }
  else {
    name += inputString[i];

  }
}
search(operand,name);
 