$(document).ready(function(){
//NAV MENU ON PHONE:
  $('.fa-bars').click(function(){
    $(this).toggleClass('fa-times fa-bars');
    $('.nav-menu').fadeToggle('fast');
  });
  $('.nav-menu a').click(function(){
    $('.fa-times').toggleClass('fa-times fa-bars');
    $('.nav-menu').fadeOut('fast');
  });
//JUMP ON PAGE:
  $('.products_button').click(function(){
    $("html, body").animate({scrollTop: $("#products").offset().top}, "slow");
  })
  $('.cart, .cart_button').click(function(){
    $("html, body").animate({scrollTop: $("#cart").offset().top}, "slow");
  })
  $('.contact_button').click(function(){
    $("html, body").animate({scrollTop: $("#contact").offset().top}, "slow");
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
//BIG PHOTO:
  $('.product img').click(function(){
    $('.big-photo-box').fadeIn('fast');
    $('.big-photo').attr('src', $(this).attr('src'));
  });
  $('.big-photo-box').click(function(){
    $(this).fadeOut('fast');
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
  }

  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0 || input.value > 500) {
      input.value = 1
    }
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
      $('.continue-button').removeClass('emptybutton');
    } else {
      $('.empty-cart').show();
      $('.continue-button').addClass('emptybutton');
      $('.order-page').hide();
      $('.continue-button').show();
    }
  }
//PURCHASE:
  $('.continue-button').click(function(){
    if ($('.yourcart').children().length == 0) {
      alert('A kosár üres!')
    } else {
      $('.order-page').show();
      $(this).hide();
    }
  })

  $('.purchase-button').click(function(){
    var fullName = $('input[name=full-name]').val();
    var emailAddress = $('input[name=email]').val();
    var phoneNumber = $('input[name=phone-number]').val();
    var organization = $('input[name=organization]').val();
    var synagogueAddress = $('input[name=synagogue-address]').val();
    var message = $('input[name=message]').val();

    var firstProduct = $('.cart-row .cart-item-title').eq(0).text();
    var secondProduct = $('.cart-row .cart-item-title').eq(1).text();
    var thirdProduct = $('.cart-row .cart-item-title').eq(2).text();
    var fourthProduct = $('.cart-row .cart-item-title').eq(3).text();

    var firstProductValue = $('.cart-row input').eq(0).val();
    var secondProductValue = $('.cart-row input').eq(1).val();
    var thirdProductValue = $('.cart-row input').eq(2).val();
    var fourthProductValue = $('.cart-row input').eq(3).val();

    var email = `
      <h3>Rendelés adatai:</h3>
      <ul>
        <li>Név: ` + fullName + `</li>
        <li>Email: ` + emailAddress + `</li>
        <li>Telefonszám: ` + phoneNumber + `</li>
        <li>Szervezet: ` + organization + `</li>
        <li>Zsinagóga címe: ` + synagogueAddress + `</li>
      </ul>
      <h3>Termék(ek):</h3>
      <p>` + firstProduct + ` ` + firstProductValue + `</p>
      <p>` + secondProduct + ` ` + secondProductValue + `</p>
      <p>` + thirdProduct + ` ` + thirdProductValue + `</p>
      <p>` + fourthProduct + ` ` + fourthProductValue + `</p>
      <h3>Üzenet:</h3>
      <p>` + message + `</p>`

    if (fullName && email && phoneNumber && organization && synagogueAddress) {
      alert('Köszönjük a vásárlást!')
      sendEmail(email, emailAddress)
      var cartItems = document.getElementsByClassName('yourcart')[0]
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
      }
      $('.order-page').hide();
      $('.continue-button').show();
      emptyCart()
      $('.order-page input').val('');
      $('.purchase-button').addClass('emptybutton');
    } else {
      alert('Kérjük mindent töltsön ki!');
    }
  });

  $('.order-page input').change(function(){
    var fullName = $('input[name=full-name]').val();
    var email = $('input[name=email]').val();
    var phoneNumber = $('input[name=phone-number]').val();
    var organization = $('input[name=organization]').val();
    var synagogueAddress = $('input[name=synagogue-address]').val();
    var message = $('input[name=message]').val();

    if (fullName && email && phoneNumber && organization && synagogueAddress) {
      $('.purchase-button').removeClass('emptybutton');
    } else {
      $('.purchase-button').addClass('emptybutton');
    }
  })

  function sendEmail(email, emailAddress){
    Email.send({
    SecureToken: "fdcbd957-d580-455f-82b1-dad344c82f07",
    To : "sebestyen.greta@zsido.com, " + emailAddress,
    From : "shlischus.termekek@gmail.com",
    Subject : " Új Rendelés",
    Body : email
    }).then(
      message => alert(message)
    );
  }
});
