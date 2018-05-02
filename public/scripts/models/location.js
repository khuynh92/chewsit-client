

var app = app || {};

(function (module) {

  const location = {};

  $('#geo').on('click touchstart', e => {
    e.preventDefault();
    $('#enter-location').hide();
    $('#or').hide();
    $('#location-notice').text('Current Location Saved!').css({ 'color': 'green' });
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        location.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(location.pos.lat + ', ' + location.pos.lng);
        app.location.pos = location.pos;
      });
    }
  });

  module.location = location;

})(app);