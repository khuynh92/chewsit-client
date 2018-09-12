'use strict';

var app = app || {};
const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://chewsit-server.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  const restaurant = {};
  const location = {};

  restaurant.randomOffset = (location, food, price, range) => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${location}/${price}/${range}/0`)
      .then(result => {
        console.log('original total', result.total);
        restaurant.offset = result.total < 51 ? 0 : Math.floor(Math.random() * result.total - 4);
        console.log('offset, if number is greater than 50. If not this number will be 0:', restaurant.offset);
        restaurant.results(location, food, price, range, restaurant.offset);

      });
  };

  restaurant.route = (userLoc, restLat, restLng) => {
    $.get(`${ENV.apiUrl}/directions/${userLoc}/${restLat},${restLng}`)
      .then(results => {
        console.log(`/directions/${userLoc}/${restLat},${restLng}`);
        console.log(results);
      });
  };

  restaurant.results = (location, food, price, range, offset) => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${location}/${price}/${range}/${offset}`)
      .then(result => {

        restaurant.endResults = [];
        restaurant.endResultsIndex = [];
        let userLocation = app.location.pos ? app.location.pos.lat + ',' + app.location.pos.lng : $('#zip').val();
        console.log(userLocation);

        restaurant.array = result.businesses;
        if (restaurant.array.length > 3) {
          for (let i = 0; i < 3; i++) {
            restaurant.endResultsIndex[i] = Math.floor(Math.random() * restaurant.array.length);
          }
          console.log(restaurant.endResultsIndex);
          while (restaurant.endResultsIndex[0] === restaurant.endResultsIndex[1]) {
            restaurant.endResultsIndex[1] = Math.floor(Math.random() * restaurant.array.length);
          }
          while (restaurant.endResultsIndex[1] === restaurant.endResultsIndex[2] || restaurant.endResultsIndex[2] === restaurant.endResultsIndex[0]) {
            restaurant.endResultsIndex[2] = Math.floor(Math.random() * restaurant.array.length);
          }
          restaurant.endResultsIndex.forEach(number => restaurant.endResults.push(restaurant.array[number]));
        } else if (restaurant.array.length <= 3) {
          restaurant.array.forEach(element => {
            restaurant.endResults.push(element);

          });
        }

        localStorage.results = JSON.stringify(restaurant.endResults);
        restaurant.route(userLocation, app.restaurant.endResults[0].coordinates.latitude, app.restaurant.endResults[0].coordinates.longitude
        );
        app.location.pos = null;

      }).then(setTimeout(() => page('/display'), 1500));
  };


  $('#app-form').on('submit', (e) => {
    e.preventDefault();
    $('#location-notice').text('');
    $('#range-notice').text('');
    $('#price-notice').text('');
    $('#meal-notice').text('');


    if ((app.location.pos || $('#zip').val()) && $('#range').val() && $('input[name=dolla]:checked').val() && $('input[name=mealtype]:checked').val()) {

      restaurant.location = app.location.pos ? `latitude=${app.location.pos.lat}&&longitude=${app.location.pos.lng}` : `location=${$('#zip').val()}`;
      restaurant.food = $('input[name=mealtype]:checked').val();
      restaurant.range = $('#range').val();
      restaurant.price = $('input[name=dolla]:checked').val();

      if ($('input[name=mealtype]:checked').val() === 'desserts' || $('input[name=mealtype]:checked').val() === 'breakfast') {
        restaurant.food = $('input[name=mealtype]:checked').val();
      } else {

        if (localStorage.preferences && JSON.parse(localStorage.preferences).length > 0) {
          restaurant.food = `${JSON.parse(localStorage.preferences)[Math.floor(Math.random() * JSON.parse(localStorage.preferences).length)]},${JSON.parse(localStorage.preferences)[Math.floor(Math.random() * JSON.parse(localStorage.preferences).length)]},${JSON.parse(localStorage.preferences)[Math.floor(Math.random() * JSON.parse(localStorage.preferences).length)]}`;
        } else {
          restaurant.food = 'restaurant';
        }
      }
      restaurant.randomOffset(restaurant.location, restaurant.food, restaurant.price, restaurant.range);
      // app.location.pos = null;
      $('#chewsit').hide();
      $('.icon-spinner').show();
      $('#location-input').hide();
    } else {
      if (!app.location.pos && !$('#zip').val()) $('#location-notice').append('Please Use your Location').css({ 'color': 'red' });

      if (!$('#range').val()) {
        $('#range-notice').append('Please select your distance').css({ 'color': 'red' });
      }

      if (!$('input[name=dolla]:checked').val()) {
        $('#price-notice').append('Please select your price').css({ 'color': 'red' });
      }

      if (!$('input[name=mealtype]:checked').val()) {
        $('#meal-notice').append('Please select your Meal Type').css({ 'color': 'red' });
      }

    }
  });

  $('#enter-location').on('click touchstart', e => {
    e.preventDefault();
    $('#enter-location').hide();
    $('#geo').hide();
    $('#or').hide();
    $('#location-input').show();
    $('.buttons2 div').css({ 'width': '254px' });
  });

  module.location = location;
  module.restaurant = restaurant;

})(app);