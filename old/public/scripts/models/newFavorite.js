'use strict';

var app = app || {};

(function(module) {

  const dbFavoriteForm = {};

  dbFavoriteForm.createNewFavorite = (newFavoriteID, userID) => {
     console.log(newFavoriteID, userID)
      let formData = {}
      $.post(`${ENV.apiUrl}/favorites/new`, {
          yelp_id: newFavoriteID,
          users_id: userID,
      })
      .then(response => {
          console.log('added new favorite');
      })
      .catch(err => console.log(err));
  }

  $('#create-favorite').on('submit', (e) => {
    e.preventDefault();
      let newFavoriteID = $('#business-id').val();
      let userID = $('#user-id').val();
   console.log(newFavoriteID, userID);
      $('#newFavorite p').html(newFavoriteID, userID);
    
      dbFavoriteForm.createNewFavorite(newFavoriteID, userID);
  });

module.dbFavoriteForm = dbFavoriteForm;

})(app);