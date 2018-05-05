'use strict';

var app = app || {};

(function(module) {

  const restaurantView = {};

// LANDING PAGE VIEW
restaurantView.initIndexView = function() {

  $('.container').hide();
  $('.home-view').show();
  $('#about-button').show();
  $('#home-button').show();
  if(localStorage.ID) {
    page('/form');
    $('#logoutButton').show();
    $('#preferences-button').show();
    $('#home-button').hide();
    $('#about-button').hide();
  }
}

module.restaurantView = restaurantView;

})(app);