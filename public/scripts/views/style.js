'use strict'


$('.nav-container').on('click', function(){
  $('.nav-container').toggleClass("change")
  $('.nav-ul').toggleClass('sidenav').toggleClass('hide-nav')
})