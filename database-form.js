
'use strict';

var app = app || {};

(function(module) {

  const dbUserForm = {};

  $('#create-user').on('submit', (e) => {
      let newUserName = $('#create-name').val();
      let newUserPin = $('#create-pin').val();
      console.log(`${newUserName} : ${newUserPin}`);
      $('#newUser').html(newUserName, newUserPin);
      e.preventDefault();
    });
   

module.dbUserForm = dbUserForm;

})(app);
