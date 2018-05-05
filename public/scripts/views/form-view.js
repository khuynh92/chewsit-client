'use strict';

var app = app || {};

(function(module) {

  const form = {};
// changed id=app-form to class=form-app

  form.init = () => {
    if(localStorage.ID) {
      $('#logoutButton').show();
    }
    $('.form-app').show();
    console.log('form is showing')
    // $('#adventure-button').show();
  };

module.form = form;

})(app);
