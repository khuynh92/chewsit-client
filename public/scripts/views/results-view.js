'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    // $('#display-results').empty();
    $('.display-results').show();
    if (app.endResultsIndex === 0) {
      $('#display-results').append('<p> No results found </p>');
    } else {
     console.log(app.restaurant.endResults[0])
      // Grab the template script
      let theTemplateScript = $("#display-results-template").html();
    
      // Compile the template
      let theTemplate = Handlebars.compile(theTemplateScript);
    
      // Define our data object
      let context = app.restaurant.endResults[0];
    
      // Pass our data to the template
      let theCompiledHtml = theTemplate(context);
    
      // Add the compiled html to the page
      $('#results-list').append(theCompiledHtml);
   
    }
  };

  module.resultsView = resultsView;

})(app);
