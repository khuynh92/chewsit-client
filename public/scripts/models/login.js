'use strict';

var app = app || {};

(function(module) {

  let userInfo = {};
  let dbLogin = {};

  $('#user-login').on('submit', (e) => {
    e.preventDefault();
      let checkUserName = $('#user-name').val();
      let checkUserPin = $('#user-pin').val();
    console.log(checkUserName, checkUserPin);
    console.log(typeof(checkUserName), typeof(checkUserPin));
     
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
        });
    }

function checkIfValid(returnFromDB) {
    if (!returnFromDB.length) {
        alert('Invalid username/password');
        }
    }   

function checkLocalStorage() {
    if (!localStorage) {
        localStorage.setItem('id', JSON.stringify(userInfo.id));
    }
}

module.dbLogin = dbLogin;
module.userInfo = userInfo;

})(app);