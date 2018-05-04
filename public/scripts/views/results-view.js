'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    $('#display-results').empty();
    $('#display-results').show();
    if (app.restaurant.endResults.length === 0) {
      $('#display-results').append('<li>No results found</li>');
    } else {
      app.restaurant.endResults.forEach(element => ($('#display-results').append(`<li>${element.name} ${element.rating} <img src='${element.image_url}' /></li>`)));
    }
  };

  module.resultsView = resultsView;

})(app);
