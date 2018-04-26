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

module.restaurant = restaurant;

})(app);
