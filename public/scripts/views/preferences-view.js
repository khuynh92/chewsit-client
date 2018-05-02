'use strict';

var app = app || {};

(function(module) {

  const preferences = {};

  preferences.init = () => {
    $('.preferences-page').show();
    console.log('preferences is showing')

  };


module.preferences = preferences;

})(app);
