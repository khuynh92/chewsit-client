'use strict'

var app = app || {};

(function (module) {
  var preferenceArray = [];
  $('.save-preferences').on('click', (e) => {
    e.preventDefault();
    $('.choice:checked').each(function () {
      console.log($(this).val());
      if (!preferenceArray.includes($(this).val())) {
        preferenceArray.push($(this).val());
      }

    }) 
    $('.choice').not(':checked').each(function(){ console.log(`unchecked: `, $(this).val())
    if(preferenceArray.includes($(this).val())){
      preferenceArray.splice(preferenceArray.indexOf($(this).val(), 1))
        }
      }) 
      
      let arrayToSend = JSON.stringify(preferenceArray);
      $.ajax({
        url: `${ENV.apiUrl}/preferences/update`,
        method: 'PUT',
        data:{preferences: arrayToSend, id: 8},
        success: function(data) {
          alert('Preferences Updated');
        }
      });

    })
    $('.choice').not(':checked').each(function () {
      console.log(`unchecked: `, $(this).val());
      if (preferenceArray.includes($(this).val())) {
        preferenceArray.splice(preferenceArray.indexOf($(this).val(), 1));
      }
    })

    let arrayToSend = JSON.stringify(preferenceArray);
    $.ajax({
      url: `${ENV.apiUrl}/preferences/update`,
      method: 'PUT',
      data: { preferences: arrayToSend, id: 1 },
      success: function (data) {
        alert('Preferences Updated');
      }
    });
  })

  module.preferenceArray = preferenceArray;

})(app);