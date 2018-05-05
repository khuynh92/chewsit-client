'use strict';

var app = app || {};

(function(module) {

  const form = {};

  form.init = () => {
    if(localStorage.ID) {
      $('#logoutButton').show();
      $('#preferences-button').show();
      $('#home-button').hide();
    }
    $('#or').show();
    $('#geo').show();
    $('.form-app').show();
    $('#chewsit').show();
    $('.icon-spinner').hide();
    console.log('form is showing');
  };

module.form = form;

})(app);
