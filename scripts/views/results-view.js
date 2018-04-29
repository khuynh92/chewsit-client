'use strict';

var app = app || {};

(function (module) {

  const resultsView = {};

  resultsView.initDisplayResults = () => {
    $('#display-results').show();
    if (app.endResultsIndex === 0) {
      $('#display-results').append('<p> No results found </p>');
    } else {
      app.restaurant.endResults.forEach(element => ($('#display-results').append(`<li>${element.name} ${element.rating} <img src='${element.image_url}' /></li>`)));
    }
  };

  module.resultsView = resultsView;

})(app);
