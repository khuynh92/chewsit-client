
var app = app || {};

(function(module) {

  const loginView = {};

  loginView.init = () => {
    // $('.container').hide();
    $('#newFavoriteDiv').hide();
    $('#newUserDiv').hide();
    $('#loginDiv').show();
    console.log('login is showing');
  };

module.loginView = loginView;

})(app);
