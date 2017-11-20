var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routing/htmlRoutes.js")(app);
require("./routing/apiRoutes.js")(app);
var friends = require("./data/friends.js");

// app.get("/home", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/home.html"))
// })

app.post("/api/friends", function(req, res) {
  
  var surveyResults = req.body;
  console.log(surveyResults);
  surveyResults.name = surveyResults.name.replace(/\s+/g, "").toLowerCase();
  console.log(surveyResults.name);
  surveyResults.photo = surveyResults.photo.replace(/\s+/g, "").toLowerCase();
  console.log(surveyResults.photo);
  // surveyResults.scores = parseInt(surveyResults.scores[0].replace(/\s+/g, ""));
  // console.log(surveyResults.scores[0]);
  // var newFriend = res.json(surveyResults);
  // for(var i = 0; i < surveyResults['scores[]'].length; i++) {
  //   surveyResults['scores[]'][i] = parseInt(surveyResults['scores[]'][i]);
  // }
  convertStringToInt(surveyResults['scores[]']);

  var newUserScores = surveyResults['scores[]'];
  var matchName = '';
  var matchImage = '';
  var totalDifference = 10000;


    for (var i = 0; i < friends.length; i++) {
      var diff = 0;

      for (var j = 0; j < friends[i].scores.length; j++) {
        diff += Math.abs(friends[i].scores[j] - newUserScores[j]);
      }
      if (diff < totalDifference) {

        totalDifference = diff;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    console.log(totalDifference);

    // Add new user
    // friends.push(userInput);

    // Send appropriate response
    // res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

  // console.log("All Scores", surveyResults['scores[]']);
  // var officialMatchScore = 1000;
  // var scoreDifference = 0;
  // for(var j = 0; j < friends.length; j++) {
  //   var scoreDifference = 0;
    // for(var k = 0; k < friends[0].scores.length; k++) {
    //     scoreDifference += Math.abs(surveyResults['scores[]'][k] - friends[0].scores[k]);
    // }
    // console.log(scoreDifference);
  });
  //     } if(scoreDifference < officialMatchScore) {
  //         officialMatchScore = scoreDifference;
  //       }
  //   }
  // }
//   console.log("Score", officialMatchScore);
//   return officialMatchScore;
// })
// surveyResults['scores[]']

function convertStringToInt(surveyResults) {
    for(var i = 0; i < surveyResults.length; i++) {
    surveyResults[i] = parseInt(surveyResults[i]);
  }
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
})

