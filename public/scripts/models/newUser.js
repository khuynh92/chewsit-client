
'use strict';

(function(module) {

  const dbUserForm = {};

  $('#create-user').on('submit', (e) => {
    e.preventDefault();
      let newUserName = $('#create-name').val();
      let newUserPin = $('#create-pin').val();
   console.log(newUserName, newUserPin);
      $('#newUser p').html(newUserName, newUserPin);
    
      dbUserForm.createNewUser(newUserName, newUserPin);
      dbUserForm.validateNewUser(newUserName, newUserPin)

  });

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

    dbUserForm.validateNewUser = (nameFromDB, pinFromDB) => {
    console.log(nameFromDB);
    $.get(`${ENV.apiUrl}/users/login/${nameFromDB}/${pinFromDB}`)
    .then(response => {
        let newID = response[0].id;
        console.log(newID);
        localStorage.setItem('ID', JSON.stringify(newID));
    });
}


module.dbUserForm = dbUserForm;

})(app);
