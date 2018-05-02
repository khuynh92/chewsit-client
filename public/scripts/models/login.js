'use strict';

var app = app || {};

(function(module) {

  const loginCheck = {};
  const dbLogin = {};

  dbLogin.validateUser = (nameFromDB, pinFromDB) => {
      console.log(nameFromDB);
      $.get(`${ENV.apiUrl}/users/login/${nameFromDB}/${pinFromDB}`)
      .then(response => {
          console.log('logged in');
          console.log(response);
      })
      .catch(console.error('invalid'));
  }

  $('#user-login').on('submit', (e) => {
    e.preventDefault();
      let checkUserName = $('#user-name').val();
      let checkUserPin = $('#user-pin').val();
   console.log(checkUserName, checkUserPin);
   console.log(typeof(checkUserName), typeof(checkUserPin));
      $('#loginSection p').html(checkUserName, checkUserPin);
    
      dbLogin.validateUser(checkUserName, checkUserPin);
  });

module.dbLogin = dbLogin;

})(app);