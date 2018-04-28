

var app = app || {};

(function (module) {

  const location = {};


  $('#current-location').on('click touchstart', e => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
         location.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(location.pos);
      });
    }
    module.location = location;
  });

})(app);
