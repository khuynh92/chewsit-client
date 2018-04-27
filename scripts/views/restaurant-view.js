'use strict';

var app = app || {};

(function(module) {

  const restaurantView = {};

// LANDING PAGE VIEW
restaurantView.initIndexView = function() {
  $('.container').hide();
  $('.home-view').show();
}
// FORM PAGE VIEW
restaurantView.initFormView = () => {
$('#app-form').show();
}
//RESULTS VIEW PAGE
  restaurantView.initDisplayView = () => {
    $('#display-view').empty();
    $('#display-view').fadeIn(750);
    app.restaurant.array.forEach(restaurant => $('#display-view').append(`<li>${restaurant.name} ${restaurant.rating}</li>`));
  };

module.restaurantView = restaurantView;

})(app);