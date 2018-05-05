'use strict';

var app = app || {};

(function(module) {

  const restaurantView = {};

// LANDING PAGE VIEW
restaurantView.initIndexView = function() {

  $('.container').hide();
  $('.home-view').show();
  if(localStorage.ID) {
    page('/form');
    $('#logoutButton').show();
    $('#preferences-button').show();
    $('#home-button').hide();
  }
}

module.restaurantView = restaurantView;

})(app);