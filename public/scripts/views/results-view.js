'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    // $('#display-results').empty();

    
    if (app.restaurant.endResults.length === 0) {
      // $('.display-results').show();
      $('#display-results').append('<li>No results found</li>');
    }
     else {
      console.log('display something with', app.restaurant.endResults)
      $('.display-results').show()
      // let template = $('#display-results-template').text()
      // let theTemplate = Handlebars.compile(template)
      // let context = theTemplate(app.restaurant.endResults)

      // $('#results-list').append(context)}
    }

  }
  module.resultsView = resultsView;

})(app);
