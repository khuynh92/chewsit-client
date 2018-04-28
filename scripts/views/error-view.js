'use strict';

var app = app || {};

(function(module) {

  const test = {};

  test.initView = () => {
    $('#test').empty();
    $('#test').fadeIn(750);
    app.restaurant.array.forEach(restaurant => $('#test').append(`<li>${restaurant.name} ${restaurant.rating}</li>`));
  };

module.test = test;

})(app);