'use strict';

var app = app || {};

(function(module) {

  const newUser = {};

  newUser.initView = () => {
    $('#home-view').hide();
    $('#newUserDiv').show();
    $('#home-button').show();
    $('#about-button').show();
    console.log('create-user is showing');
  };

module.newUser = newUser;

})(app);
