'use strict';

var app = app || {};

(function (module) {

  let userInfo = {};
  let dbLogin = {};

  $('#user-login').on('submit', (e) => {
    e.preventDefault();
    let checkUserName = $('#user-name').val();
    let checkUserPin = $('#user-pin').val();
    console.log(checkUserName, checkUserPin);
    console.log(typeof (checkUserName), typeof (checkUserPin));

    if (!checkUserName && !checkUserPin) {
      $('#login-text').text('Please Fill in your Username and Pin!').css({ 'color': 'red' });
    } else if (!checkUserPin) {
      $('#login-text').text('Please Fill in your and Pin!').css({ 'color': 'red' });
    } else if (!checkUserName) {
      $('#login-text').text('Please Fill in your Username!').css({ 'color': 'red' });
    }

    dbLogin.validateUser(checkUserName, checkUserPin);
  });

  dbLogin.validateUser = (nameFromDB, pinFromDB) => {
    console.log(nameFromDB);
    $.get(`${ENV.apiUrl}/users/login/${nameFromDB}/${pinFromDB}`)
      .then(response => {
        checkIfValid(response);
        userInfo.id = response[0].id;
        userInfo.name = response[0].name;
        userInfo.preferences = response[0].preferences;
        checkLocalStorage();
        goToFormPage();
        $('#user-login').trigger('reset');
      });
  }

  function checkIfValid(returnFromDB) {
    if (!returnFromDB.length) {
      $('#login-text').text('Invalid username/password').css({ 'color': 'red' });
    }
  }

  function checkLocalStorage() {
    if (!localStorage.ID) {
      localStorage.ID = JSON.stringify((userInfo.id));
    }
  }

  function goToFormPage() {
    page('/form');
  }

  module.dbLogin = dbLogin;
  module.userInfo = userInfo;

})(app);