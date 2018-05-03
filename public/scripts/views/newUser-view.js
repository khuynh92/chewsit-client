'use strict';

var app = app || {};

(function(module) {

  const newUser = {};

  newUser.initView = () => {
    $('#home-view').hide();
    $('#newFavoriteDiv').hide();
    $('#loginDiv').hide();
    $('#newUserDiv').show();
    $('#newUser p').text('I am here')
    console.log('create-user is showing')
  };

module.newUser = newUser;

})(app);
