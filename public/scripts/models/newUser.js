
'use strict';



(function(module) {

  const dbUserForm = {};

  dbUserForm.createNewUser = (newUserName, newUserPin) => {
      console.log(newUserName, newUserPin);
      let formData = {}
      $.post(`${ENV.apiUrl}/users/new`, {
          name: newUserName,
          pin: newUserPin,
      })
      .then(response => {
          console.log('added new user');
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

module.dbUserForm = dbUserForm;

})(app);