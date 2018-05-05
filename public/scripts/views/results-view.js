'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};
  
  if(localStorage.ID) {
    $('.container').hide();
    $('#logoutButton').show();
    $('#preferences-button').show();
   
  }
  resultsView.initDisplayResults = () => {
    $('header').show();
    $('#results-list').empty();
    $('#display-results').show();
    if (JSON.parse(localStorage.results).length === 0) {
      $('#results-list').append('<li>No results found</li>');

    } else if(localStorage.results.length >= 1) {
      resultsView.showResultsHtml(JSON.parse(localStorage.results))
    } else {
      resultsView.showResultsHtml(app.restaurant.endResults);
    }
    $('#results-list li').hide();
    $('#results-list li').first().show();
    $('#results-list li button').last().hide();
    $('.next').on('click touchstart', function() {
    $(this).parent().hide();
    $(this).parent().next().show();
    });
  };

  resultsView.showResultsHtml = (data) => {
    let template = Handlebars.compile($('#display-results-template').text());
    data.forEach(object =>  $('#results-list').append(template(object)));
  }
  module.resultsView = resultsView;

})(app);
