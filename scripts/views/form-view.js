'use strict';

var app = app || {};

(function(module) {

  const form = {};

  form.init = () => {
    $('#app-form').show();
    console.log('form is showing')
  };


module.form = form;

})(app);