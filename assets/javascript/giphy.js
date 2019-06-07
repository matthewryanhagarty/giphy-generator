//buttons already on the page when the page loaded  ----x
        //JS is populating the buttons in the top ----x
//when you click on the button:
      //10 images are displayed from the giphy API of the topic
      // these images are responsive in terms of clicking on them to start and stop
      // each button is part of an array
              // the array is looping through and generating a button for each one
              //the button's have to have or name or whatever that is linked to the giphy API
              // on click 

//there will an input that will have to store the users answers as a value
        //this will then have to be created into a button that also acceses the giphy api

// $(document).ready(function(){


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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + breakfast + "&api_key=MWcpJfnOXM8K47gFSCBq3kOPopsVa2Cp&limit=10";

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

  var giferate = $("#breakfast-input").val().trim();

  topics.push(giferate);

  renderButtons();
});

renderButtons();

$('.carousel').carousel({
  setInterval: 1000
})


// $(".gif").on("click", function() {

//   var state = $(this).attr("data-state");

//   if (state === "still") {
//     $(this).attr("src", $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate");
//   } else {
//     $(this).attr("src", $(this).attr("data-still"));
//     $(this).attr("data-state", "still");
//   }
