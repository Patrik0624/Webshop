$(document).ready(function(){
//PHOTO SELECTOR:
  $('.photoselector img').click(function(){
    $('.photoselector img').removeClass('current');
    $(this).addClass('current');
    $('.active').attr('src', $(this).attr('src'));
  });

  $('.prev').click(function(){
    $('.photoselector img:last').prependTo('.photoselector');
  });
  $('.next').click(function(){
    $('.photoselector img:first').appendTo('.photoselector');
  });
//BACK TO MENU:
  $('.backtomenu').click(function(){
    window.open($(this).attr("href"),"_self");
  });
});
