'use strict';

var app = app || {};

(function(module) {

  const newUser = {};

  newUser.initView = () => {
    $('header').show();
    $('#home-view').hide();
    // $('#newFavoriteDiv').hide();
    // $('#loginDiv').hide();
    $('#newUserDiv').show();
    console.log('create-user is showing');
  };

module.newUser = newUser;

})(app);
