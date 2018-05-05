'use strict'


$('.nav-container').on('click', function(){
  $('.nav-container').toggleClass("change")
  $('.nav-ul').toggleClass('sidenav').toggleClass('hide-nav')
})

$('html').click(function() {
  $('.nav-container').removeClass("change")
  $('.nav-ul').removeClass('sidenav').addClass('hide-nav')
});

$('.nav-container').click(function(event){
    event.stopPropagation();
});