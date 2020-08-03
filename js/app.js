$(document).ready(function(){
//JUMP ON PAGE:
  $('.products_button').click(function(){
    $("html, body").animate({scrollTop: $("#products").offset().top}, "slow");
  })
  $('.cart').click(function(){
    $("html, body").animate({scrollTop: $("#cart").offset().top}, "slow");
  })
//PRODUCT PHOTO VIEWER:
  $('button[name=next]').click(function(){
    var imageSlider = $(this).siblings('.image-slider');
    imageSlider.find('.active').appendTo(imageSlider);
    imageSlider.find('img').removeClass('active');
    imageSlider.find('img').first().addClass('active');
  });
  $('button[name=prev]').click(function(){
    var imageSlider = $(this).siblings('.image-slider');
    imageSlider.find('.active').prependTo(imageSlider);
    imageSlider.find('img').removeClass('active');
    imageSlider.find('img').last().addClass('active');
  });
//COLOR SELECTER:
  $('.select-color-button').click(function(){
    $('.color-selector').fadeIn('fast');
  });
  $('.color-selector').click(function(){
    $(this).fadeOut('fast');
  });
  $('button[name=mallow]').click(function(){
    addItemToCart('Előétel áldás kártya mályva', 'assets/Products/Elő áldás kártya/eloaldas.JPG');
  });
  $('button[name=blue]').click(function(){
    addItemToCart('Előétel áldás kártya kék', 'assets/Products/Elő áldás kártya/eloaldaskek.JPG');
  });
//CART:
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }

  function ready() {
    var removeCartItemButtons = $('.removeItem')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = $('.cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = $('.add-cart-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase-button')[0].addEventListener('click', purchaseClicked)
  }

  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0 || input.value > 500) {
      input.value = 1
    }
  }

  function purchaseClicked() {
    if ($('.yourcart').children().length == 0) {
      alert('A kosár üres!')
    } else {
      alert('Köszönjük a vásárlást!')
    }
    var cartItems = document.getElementsByClassName('yourcart')[0]
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
    }
    emptyCart()
  }

  function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    emptyCart()
  }

  function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-img')[0].src
    addItemToCart(title, imageSrc)
  }

  function addItemToCart(title, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('yourcart')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Ez a termék már a kosaradban van!')
            return
        }
    }
    var cartRowContents = `
    <img src="${imageSrc}" alt="">
    <div class="cart-item-title-box">
      <h3 class="cart-item-title">${title}</h3>
    </div>
    <input class="cart-quantity-input" type="number" value="1">
    <button class="removeItem" type="button" name="button">Törlés</button>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('removeItem')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    emptyCart()
}
  function emptyCart() {
    if ($('.yourcart').children().length > 0) {
      $('.empty-cart').hide();
      $('.purchase-button').removeClass('emptybutton');
    } else {
      $('.empty-cart').show();
      $('.purchase-button').addClass('emptybutton');
    }
  }
});
