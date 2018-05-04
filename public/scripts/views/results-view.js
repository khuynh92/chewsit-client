'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    $('#results-list').empty();
    $('#display-results').show();

    if (app.restaurant.endResults.length === 0) {
      $('#display-results').append('<li>No results found</li>');

    } else {
      resultsView.showResultsHtml(app.restaurant.endResults);
    }
  };


  resultsView.showResultsHtml = (data) => {
    let template = Handlebars.compile($('#display-results-template').text());
    data.forEach(object =>  $('#results-list').append(template(object)));
   
  }
  module.resultsView = resultsView;

})(app);
