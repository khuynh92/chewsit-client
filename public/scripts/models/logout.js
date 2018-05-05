'use strict'

var app = app || {};

(function (module) {

  const logoutButton = {};

  $('#logoutButton').on('click', e => {
    e.preventDefault();
    localStorage.clear();
    page('./');
  });

  module.logoutButton = logoutButton;

})(app);