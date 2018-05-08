'use strict';

var app = app || {};

(function (module) {

  const preferences = {};

  preferences.init = () => {
    $('header').show();

    console.log('preferences is showing');
    var preferencesArray = [];

    if(localStorage.ID) {
      $('#form-video').show();
      $('#logoutButton').show();
      $('#preferences-button').show();
      $('#home-button').hide();
      $('#about-button').hide();
    $.get(`${ENV.apiUrl}/users/preferences/${localStorage.ID}`)
      .then(response => {
        preferencesArray = JSON.parse(response[0].preferences);
        checkThem(preferencesArray);
      });
    }

    $('.preferences-page').show();

    let checkThem = function (array) {
      array.forEach(food => $('.preferences-page').find($(`[value=${food}]`).prop('checked', true)));
    };

  };


  module.preferences = preferences;

})(app);


