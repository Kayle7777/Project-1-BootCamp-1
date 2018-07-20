// Function to retrieve soundtrack info from inputed movie
function imdbAjax(name){
  // Creating var for OMDb API
  var queryURL = "http://www.omdbapi.com/?t=" + name + "&apikey=76978dc"

  // Gets info from OMDb
  $.ajax( {
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(response.imdbID);

    // Passes OMDb targeted response into cors.io to read specific web page
    $.ajax( {
      url: `https://cors.io/?https://www.imdb.com/title/${response.imdbID}/soundtrack`,
      method: "GET",
      crossDomain: true,
      dataType: "html",
      success: function(result) {
        // console.log(result);

        // Parses web page to legible HTML
        body = '<div id="body-mock">' + result.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';

        // Target specific div needed
        var $body = $(body).children("#wrapper").children("#root").children("#pagecontent").children("#content-2-wide").children("#main").children(".article.listo").children("#soundtracks_content").children(".list").children();

        for (var i = 0; i < $body.length; i++) {
          console.log($body[i])
        }
      }
    })

  })
}

// passing thru John Wick to test responses.
imdbAjax("John Wick")