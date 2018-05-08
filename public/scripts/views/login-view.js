
var app = app || {};

(function(module) {

  const loginView = {};

  loginView.init = () => {
    $('#home-video').show();
    $('header').show();
    $('#newFavoriteDiv').hide();
    $('#newUserDiv').hide();
    $('#loginDiv').show();
    $('#home-button').show();
    $('#about-button').show();
    console.log('login is showing');
  };

module.loginView = loginView;

})(app);
