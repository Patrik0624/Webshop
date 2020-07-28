$(document).ready(function(){
//JUMP ON PAGE:
  $('.products_button').click(function(){
    $("html, body").animate({scrollTop: $("#products").offset().top}, "slow");
  });
//OPEN PRODUCT:
  $(".product").click(function () {
    window.open($(this).attr("href"));
  });
//BACK TO MENU:
  $('.backtomenu').click(function(){
    window.open($(this).attr("href"));
  });
});
