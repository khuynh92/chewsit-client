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
        // setTimeout(() => page('/display'), 1500);

      });
  };

  restaurant.results = (location, food, price, range, offset) => {
    $.get(`${ENV.apiUrl}/api/yelp/v3/${food}/${location}/${price}/${range}/${offset}`)
      .then(result => {

        restaurant.endResults = [];
        restaurant.endResultsIndex = [];

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
        // restaurant.endResults.forEach(element => {
        //   this.image_url = element.image_url,
        //   this.name = element.name,
        //   this.rating = element.rating,
        //   this.display_phone = element.display_phone,
        //   this.location = element.location
        // })
        console.log('array was populated')
        // return restaurant.endResults;
      }).then(setTimeout(() => page('/display'), 1500));;
  };
  

  $('#app-form').on('submit', (e) => {
    e.preventDefault();
    $('#location-notice').text('');
    $('#range-notice').text('');
    $('#price-notice').text('');
    $('#meal-notice').text('');


    if ((app.location.pos || $('#zip').val()) && $('#range').val() && $('input[name=dolla]:checked').val() && $('input[name=mealtype]:checked').val()) {
      console.log('submitted!');
      restaurant.location = app.location.pos ? `latitude=${app.location.pos.lat}&longitude=${app.location.pos.lng}` : `location=${$('#zip').val()}`;
      restaurant.food = $('input[name=mealtype]:checked').val();
      restaurant.range = $('#range').val();
      restaurant.price = $('input[name=dolla]:checked').val();

      if ($('input[name=mealtype]:checked').val() === 'desserts' || $('input[name=mealtype]:checked').val() === 'breakfast') {
        restaurant.food = $('input[name=mealtype]:checked').val();
      } else {
       
         if (app.preferenceArray.length > 3) {
          restaurant.food = `${app.preferenceArray[Math.floor(Math.random() * app.preferenceArray.length)]},${app.preferenceArray[Math.floor(Math.random() * app.preferenceArray.length)]},${app.preferenceArray[Math.floor(Math.random() * app.preferenceArray.length)]}`;
        } else {
          restaurant.food = 'restaurant';
        }
      }
      console.log('food choice is', restaurant.food);
      restaurant.randomOffset(restaurant.location, restaurant.food, restaurant.price, restaurant.range);
      app.location.pos = null;
      $('#chewsit').hide();
      $('.icon-spinner').show();
      $('#enter-location').show();
      $('#location-input').hide();
      $('.buttons2 div').css({'width': '396px'});
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
    $('.buttons2 div').css({'width': '254px'});
  });

  // take user input (click.val()** INSERT INTO db)
  $('#preferences-button').on('click', (e) => {
    // e.preventDefault();
    console.log('werk');
    $('form').hide();
    $('.preferences-page').show();
  });


  // restaurant.showResultsHtml = (data) => {
  //   // Grab the template script
  //   var theTemplateScript = $("#display-results-template").html();
  
  //   // Compile the template
  //   var theTemplate = Handlebars.compile(theTemplateScript);
  
  //   // Define our data object
  //   var context = data;
  
  //   // Pass our data to the template
  //   var theCompiledHtml = theTemplate(context);
  
  //   // Add the compiled html to the page
  //   $('#results-list').append(theCompiledHtml);
  // }



  // restaurant.showResultsHtml = (data) => {
  //   let template = Handlebars.compile($('#display-results-template').text());
  //   $('#results-list').append(template(data));
  // }

  module.location = location;
  module.restaurant = restaurant;

})(app);