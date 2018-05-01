// 'use strict'
//
// var app = app || {};
//
  //get the values of the buttons and tore into an array and insert into DB. if the value of the array exists highlight the corresponding button.
  var preferenceArray = [];
  $('.save-preferences').on('click', (e) => {
    $('.choice:checked').each(function(){ console.log($(this).val())
      if(!preferenceArray.includes($(this).val())){
        preferenceArray.push($(this).val());
      }
    }) 
    $('.choice').not(':checked').each(function(){ console.log(`unchecked: `, $(this).val())
    if(preferenceArray.includes($(this).val())){
      preferenceArray.splice(preferenceArray.indexOf($(this).val(), 1))
        }
      }) 
    })
   