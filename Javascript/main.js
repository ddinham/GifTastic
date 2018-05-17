  var topics = ["printer jam", "error code on printer", "turn printer off and on"];
  var numberOfGIFs = 10;
  
  function renderButtons() {
    // Looping through the array of printer problems
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each printer problem in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var newButton = $("<button>");
        // Adding a class of printer problem to our button
        newButton.addClass("btn");
        newButton.addClass("printer-button")
        // Providing the initial button text
        newButton.text(topics[i]);
        // Adding the button to the HTML
        $("#button-container").append(newButton);
    }
$(".printer-button").unbind("click");    
// This function handles events where one button is clicked
$(".printer-button").on("click", function() {
    $(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}
  // populateGIFContainer function re-renders the HTML to display the appropriate content
function populateGIFContainer(show){
      // Creating an AJAX call for the specific printer problem button being clicked
      $.ajax({
              url:"https://api.giphy.com/v1/gifs/search?q=" +
              show + "&api_key=dc6zaTOxFJmzC&limit=10",
              method: "GET"
          }).then(function (response) {
            response.data.forEach(function(element){
                newDiv = $("<div>");
                newDiv.addClass("individual-gif-container");
                newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
                var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
                newImage.addClass("gif-image");
                newImage.attr("state", "still");
                newImage.attr("still-data", element.images.fixed_height_still.url);
                newImage.attr("animated-data", element.images.fixed_height.url);
                newDiv.prepend(newImage);
                $("#gif-container").append(newDiv);
            });
            
            $("#gif-container").addClass("dotted-border");
            $(".gif-image").unbind("click");
            $(".gif-image").on("click", function(){
                if($(this).attr("state") === "still") {
                    $(this).attr("state", "animated");
                    $(this).attr("src", $(this).attr("animated-data"));
                }
                else {
                    $(this).attr("state", "still");
                    $(this).attr("src", $(this).attr("still-data"));
                }
            });
        });
    }
  // We're adding a click event listener to all elements with the class "printer"
  // We're adding the event listener to the document because it will work for dynamically generated elements
  // $(".printers").on("click") will only add listeners to elements that are on the page at that time
  $(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#printer-problem").val().trim());
		$("#printer-problem").val("");
    });
});
