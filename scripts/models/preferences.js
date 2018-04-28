// 'use strict'
//
// var app = app || {};
//
  //get the values of the buttons and tore into an array and insert into DB. if the value of the array exists highlight the corresponding button.
  var preferenceArray = [];
  $('.choice').on('click', (e) => {
    if(!preferenceArray.includes(e.target.value)){
      preferenceArray.push(e.target.value);
    }
  });
