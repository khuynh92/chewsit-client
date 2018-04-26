'use strict';

var app = app || {};
const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'chewsit';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  const restaurant = {};


  restaurant.fetch = callback => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/sushi/98121`)
      .then(result => restaurant.array = result.businesses)
      .then(callback);
  };

  restaurant.results = (zip, food, price, range) => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${zip}/${price}/${range}`)
    .then(result => {
      $('#test').empty();
      restaurant.array = result.businesses;
      restaurant.array.forEach(restaurant => ($('#test').append(`<li>${restaurant.name} ${restaurant.rating}</li>`)));
      console.log(restaurant.array);
  

      $('#test').show();
    })

  };

  $('#test-form').on('submit', (e) => {
    e.preventDefault();
    console.log('hello!');
    // restaurant.formArray = [$('#zip').val(),$('#food').val(), ];
    restaurant.zip = $('#zip').val();
    restaurant.food = $('#food').val();
    restaurant.price = $('#price').val();
    restaurant.range = $('#range').val();

 restaurant.results(restaurant.zip, restaurant.food, restaurant.price, restaurant.range);

  //  callback => $.get(`${ENV.apiUrl}/api/yelp/v3/${$('#food').val()}/${$('#zip').val()}/${$('#price').val()}/${$('#range')}`)
  //   .then(result => restaurant.array = result.businesses)
  //   .then(callback);
  });


module.restaurant = restaurant;

})(app);

