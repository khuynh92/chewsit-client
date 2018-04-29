// 'use strict'
//
// var app = app || {};
//
  //get the values of the buttons and tore into an array and insert into DB. if the value of the array exists highlight the corresponding button.
  var preferenceArray = [];
  $('.save-preferences').on('click', (e) => {
    $('.choice:checked').each(function(){ console.log($(this).val())}) 
   
    // NEEED TO WORK BELOW
    if(!preferenceArray.includes($('.choice:checked')).val()){
      preferenceArray.push($('choice:checked').val());
    }
      
    })
