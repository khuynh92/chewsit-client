'use strict';

var app = app || {};

(function(module) {

  const dbFavoriteForm = {};

  dbFavoriteForm.createNewFavorite = (newUserName, newUserPin) => {
      console.log(newUserName, newUserPin);
      let formData = {}
      $.post(`${ENV.apiUrl}/users/new`, {
          name: newUserName,
          pin: newUserPin,
      })
      .then(response => {
          console.log('it worked');
      });
  }

  $('#create-user').on('submit', (e) => {
    e.preventDefault();
      let newUserName = $('#create-name').val();
      let newUserPin = $('#create-pin').val();
   console.log(newUserName, newUserPin);
      $('#newUser p').html(newUserName, newUserPin);
    
      dbUserForm.createNewUser(newUserName, newUserPin);
  });

module.dbFavoriteForm = dbFavoriteForm;

})(app);