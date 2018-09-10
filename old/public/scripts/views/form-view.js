'use strict';

var app = app || {};

(function(module) {

  const form = {};

  form.init = () => {
    if(!localStorage.ID) {
      $('#signInPlease').html('For better results, please <a href="./login">sign in</a> or <a href="./new">create an account</a> to gain access to preferences.');
    }
    $('#form-video').show();
    $('header').show();
    $('#home-button').show();
    $('#about-button').show();
    if(localStorage.ID) {
      $('#signInPlease').text('');
      $('#logoutButton').show();
      $('#preferences-button').show();
      $('#home-button').hide();
      $('#about-button').hide();
    }
    $('#or').show();
    $('#geo').show();
    $('#enter-location').show();
    $('#app-form-container').show();
    $('#chewsit').show();
    $('.icon-spinner').hide();
    console.log('form is showing');
  };

module.form = form;

})(app);
