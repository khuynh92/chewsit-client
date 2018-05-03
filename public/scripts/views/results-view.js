'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    $('#display-results').empty();
    $('#display-results').show();
    if (app.endResultsIndex === 0) {
      $('#display-results').append('<p> No results found </p>');
    } else {
     console.log(app.restaurant.endResults[0].name)
     let template = Handlebars
    }
  };

  module.resultsView = resultsView;

})(app);
