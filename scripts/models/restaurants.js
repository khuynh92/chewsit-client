'use strict';

var app = app || {};
const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'chewsit';
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

  restaurant.results = (location, food, price, range, offset) => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${location}/${price}/${range}/${offset}`)
      .then(result => {
        restaurant.endResults = [];
        const endResultsIndex = [];
        $('#test').empty();
        restaurant.array = result.businesses;
        if (restaurant.array.length === 0) {
          $('#test').append('<p> No results found </p>').show();
        } else if (restaurant.array.length > 3) {
          for (let i = 0; i < 3; i++) {
            endResultsIndex[i] = Math.floor(Math.random()*restaurant.array.length);
          }
          console.log(endResultsIndex);
          while (endResultsIndex[0] === endResultsIndex[1]) {
            endResultsIndex[1] = Math.floor(Math.random()*restaurant.array.length);
          }
          while (endResultsIndex[1] === endResultsIndex[2] || endResultsIndex[2] === endResultsIndex[0]) {
            endResultsIndex[2] = Math.floor(Math.random()*restaurant.array.length);
          }
        //   endResultsIndex.forEach(number => restaurant.endResults.push(restaurant.array[number]));
        //   restaurant.endResults.forEach(restaurant => ($('#test').append(`<li>${restaurant.name} ${restaurant.rating} <img src='${restaurant.image_url}' /></li>`)));
        //   $('#test').show();
        // } else if (restaurant.array.length <= 3) {
        //   restaurant.array.forEach(restaurant => ($('#test').append(`<li>${restaurant.name} ${restaurant.rating} <img src='${restaurant.image_url}' /></li>`)));
        //   $('#test').show();
        }
      });
  };

  $('#app-form').on('click touchstart', (e) => {
    e.preventDefault();
    if (!app.location.pos && !$('#zip').val()) $('#location-notice').text('Please Use your Location').css({ 'color': 'red' });
    else {
      console.log('submitted!');
      restaurant.location = app.location.pos ? `latitude=${app.location.pos.lat}&longitude=${app.location.pos.lng}` : `location=${$('#zip').val()}`;
      restaurant.food = $('#food').val();
      restaurant.range = $('#range').val();
      restaurant.price = $('input[name=dolla]:checked').val();
      restaurant.randomOffset(restaurant.location, restaurant.food, restaurant.price, restaurant.range);
      app.location.pos = null;
      $('#location-notice').text('');
      $('#enter-location').show();
      $('#or').show();
      $('#geo').show();

    }
  });


  $('#geo').on('click touchstart', e => {
    e.preventDefault();
    $('#enter-location').hide();
    $('#or').hide();
    $('#location-notice').text('Current Location Saved!').css({ 'color': 'green' });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        location.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(location.pos);
      });
    }
  });

  $('#enter-location').on('click touchstart', e => {
    e.preventDefault();
    $('#enter-location').hide();
    $('#geo').hide();
    $('#or').hide();
    $('#location-input').show();
  });

  // take user input (click.val()** INSERT INTO db)
  $('#preferences-button').on('click', (e) => {
    // e.preventDefault();
    console.log('werk');
    $('form').hide();
    $('.preferences-page').show();
  });

  // $('#adventure-button').on('click', (e) => {
  //     e.preventDefault();
  //    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${location}/${price}/${range}/`)
  //     .then(result => {
  //       results.businesses[0]
  //       console.log(results.businesses[0])
  //   });
  // }
  module.location = location;
  module.restaurant = restaurant;

})(app);
