'use strict';

var app = app || {};
const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'chewsit';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  const restaurant = {};


  restaurant.fetch = callback => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/sushi/98121`)
      .then(result => restaurant.array = result.businesses)
      .then(callback);
  };

  restaurant.randomOffset = (zip, food, price, range) => {
    $.get(`${ENV.apiUrl}/total/api/yelp/v3/${food}/${zip}/${price}/${range}`)
      .then(result => {
        app.restaurant.offset = result;
        console.log(result);
      });
  };

  restaurant.results = (zip, food, price, range) => {
    var offset = restaurant.randomOffset(zip, food, price, range);
    // console.log(offset);
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${zip}/${price}/${range}/0`)
      .then(result => {
        $('#test').empty();
        restaurant.array = result.businesses;
        restaurant.array.forEach(restaurant => ($('#test').append(`<li>${restaurant.name} ${restaurant.rating} ${restaurant.is_closed}</li>`)));
        console.log(restaurant.array);


        $('#test').show();
      })

  };

  $('#test-form').on('submit', (e) => {
    e.preventDefault();
    console.log('submitted!');
    // restaurant.formArray = [$('#zip').val(),$('#food').val(), ];
    restaurant.zip = $('#zip').val();
    restaurant.food = $('#food').val();
    restaurant.price = $('input[name=dolla]:checked').val();
    restaurant.range = $('#range').val();

    // restaurant.randomOffset(restaurant.zip, restaurant.food, restaurant.price, restaurant.range);
    restaurant.results(restaurant.zip, restaurant.food, restaurant.price, restaurant.range);

    //  callback => $.get(`${ENV.apiUrl}/api/yelp/v3/${$('#food').val()}/${$('#zip').val()}/${$('#price').val()}/${$('#range')}`)
    //   .then(result => restaurant.array = result.businesses)
    //   .then(callback);
  });
  $('#adventure').on('click', (e) => {
    e.preventDefault();
    console.log('adventure');
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${zip}/${price}/${range}/0`)
  });

  // take user input (click.val()** INSERT INTO db)
  $('#preferences-button').on('click', (e) => {
    e.preventDefault();
    console.log('werk');
    $('form').hide();
    $('.preferences-page').show();
  })

  module.restaurant = restaurant;

})(app);
