
var topics = ["eggs benedict" , "bacon" , "pancakes with syrup" , "coffee" , "sausage mcmuffin" , "hashbrown"];

function renderButtons() {

  $("#button-holder").empty();

  for (i = 0; i < topics.length; i++) {

    var button = $("<button>");
    button.addClass("button");
    button.attr("data-name" , topics[i]);
    button.text(topics[i]);
    $("#button-holder").append(button);
  }

$(".button").on("click" , function(){

  $("#breakfast-gifs-here").empty();

    var breakfast = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breakfast + "&api_key=MWcpJfnOXM8K47gFSCBq3kOPopsVa2Cp&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

      console.log(response);

        var results = response.data;

        for (i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          p.addClass("gif-p")

          var gifDiv = $("<div>")
          gifDiv.addClass("gif-div");
          var gif = $("<img>");

          gif.attr("src" , results[i].images.fixed_height_still.url);
          gif.attr("data-state" , "still");
          gif.attr("data-still" , results[i].images.fixed_height_still.url), 
          gif.attr("data-animate" , results[i].images.fixed_height.url)
          gif.addClass("gif");
          
          gifDiv.append(p);
          gifDiv.append(gif);

          $("#breakfast-gifs-here").prepend(gifDiv);
        }
      }
    })
  })

}
// use dcoument when you dyncamically generate elements
$(document).on("click", ".gif", function() {

      var state = $(this).attr("data-state");

      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    });

// })

$("#giferate").on("click" , function(){

  event.preventDefault();

  giferate = $("#breakfast-input").val().trim();

  if (giferate == "") {
    alert('Please enter a breakfast item');
    return false;
    } else {
  
  topics.push(giferate);

  $("#breakfast-input").val('');

  renderButtons();
  
  }
});

renderButtons();

