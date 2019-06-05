
var topics = ["eggs benedict" , "green eggs & ham" , "pancakes" , "chicken fried steak" , "cornbeef hash" , "biscuits & gravy"];

$(".gif").on("click", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

    var breakfast = $(this).attr("data-breakfast");

  //add breakfast data attribute to gifs

  //add state to gips

      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        breakfast + "&api_key=MWcpJfnOXM8K47gFSCBq3kOPopsVa2Cp";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(queryURL);

          console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var breakfastDiv = $("<div>");

            var breakfastImage = $("<img>");

            breakfastImage.attr("src", results[i].images.fixed_height.url);

            breakfastDiv.append(animalImage);

            $("#breakfast-gifs-here").prepend(breakfastDiv);
          }
      }
    })