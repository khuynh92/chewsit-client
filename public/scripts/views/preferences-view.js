'use strict';

var app = app || {};

(function (module) {

  const preferences = {};

  preferences.init = () => {
    console.log('preferences is showing');
    var preferencesArray = [];

    if(localStorage.ID) {
      $('#logoutButton').show();
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


