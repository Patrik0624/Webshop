$(document).ready(function(){
//OTHER:
  function backToNormal(){
    $('.products, .folder, .tisre-folder').hide();
    $('.card').show();
  }
//CARDS:
  $('.items-card').click(function(){
    $('.products').show();
    $('.cards').children('.card').hide();
  });

  $('.tisre-folder-card').click(function(){
    $('.tisre-folder').show();
    $('.cards').children('.card').hide();
  })

  $('.ros-hasana').click(function(){
    $('.inside-ros-hasana-folder').show();
    $('.tisre-folder').hide();
  });

  $('.szukot').click(function(){
    $('.inside-szukot-folder').show();
    $('.tisre-folder').hide();
  });
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
    backToNormal();
    $("html, body").animate({scrollTop: $("#products").offset().top}, "slow");
  })
  $('.cart, .cart_button').click(function(){
    backToNormal();
    $("html, body").animate({scrollTop: $("#cart").offset().top}, "slow");
  })
  $('.contact_button').click(function(){
    backToNormal();
    $("html, body").animate({scrollTop: $("#contact").offset().top}, "slow");
  })
  $('.logo').click(function(){
    backToNormal();
    $("html, body").animate({scrollTop: 0}, "slow");
  })
//BIG PHOTO:
  function openBigPhoto(id){
    var thisClass = id + '-photo';
    $('.' + thisClass).fadeIn('fast');
  }
  $('.product img, .folder-pictures img').click(function(){
    var id = $(this).parent().attr('id');
    openBigPhoto(id);
  });

  $('.folder-pictures img').click(function(){
    var id = $(this).attr('id');
    openBigPhoto(id);
  });

  $('.next').click(function(){
    var photoBox = $(this).siblings('.photo-box');
    photoBox.find('img').last().prependTo(photoBox);
    photoBox.find('img').removeClass('active');
    photoBox.find('img').last().addClass('active');
  });
  $('.prev').click(function(){
    var photoBox = $(this).siblings('.photo-box');
    photoBox.find('img').first().appendTo(photoBox);
    photoBox.find('img').removeClass('active');
    photoBox.find('img').last().addClass('active');
  });
  $(".big-photo-box").click(function(e){
    if(e.target != this) return;
    $(this).fadeOut("fast");
  });
//COLOR SELECTER:
  $('.select-color-button').click(function(){
    $('.color-selector').fadeIn('fast');
  });
  $('.color-selector').click(function(){
    $(this).fadeOut('fast');
  });
  $('button[name=mallow]').click(function(){
    var shopItem = $(this).parent().parent().siblings('.products').children('.eloaldaskartya');
    var imageSrc = 'assets/Products/Elő áldás kártya/eloaldas.JPG';
    var title = 'Előétel áldás kártya mályva';
    var quantity = $(shopItem).find('.quantity-selector').val();
    addItemToCart(title, imageSrc, quantity);
  });
  $('button[name=blue]').click(function(){
    var shopItem = $(this).parent().parent().siblings('.products').children('.eloaldaskartya');
    var imageSrc = 'assets/Products/Elő áldás kártya/eloaldaskek.JPG';
    var title = 'Előétel áldás kártya kék';
    var quantity = $(shopItem).find('.quantity-selector').val();
    addItemToCart(title, imageSrc, quantity);
  });
//QUANTITY PLUS & MINUS:
  $('.fa-minus').click(function(){
    var minus = +$(this).parent().siblings(".quantity-selector").val() - 1;
    $(this).parent().siblings(".quantity-selector").val(minus);
  });
  $('.fa-plus').click(function(){
    var plus = +$(this).parent().siblings(".quantity-selector").val() + 1;
    $(this).parent().siblings(".quantity-selector").val(plus);
  });
  $('.fa-minus, .fa-plus').click(function(){
    var inputVal = $(this).parent().siblings(".quantity-selector").val();
    if (inputVal <= 1) {
      $(this).parent().siblings(".quantity-selector").val(1);
    } else if (inputVal > 500) {
      $(this).parent().siblings(".quantity-selector").val(500);
    }
  });
//ADD TO CART:
  $('.add-cart-button').click(function(){
    var shopItem = $(this).parent();
    var imageSrc = $(shopItem).find('.product-img').attr('src');
    var title = $(shopItem).find('.product-title').text();
    var quantity = $(shopItem).find('.quantity-selector').val();
    addItemToCart(title, imageSrc, quantity);
  })
  $('.quantity-selector').change(function(){
    var inputVal = $(this).val();
    if (inputVal <= 1) {
      $(this).val(1);
    } else if (inputVal > 500) {
      $(this).val(500);
    }
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
  }

  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    } else if (input.value > 500) {
      input.value = 500;
    }
  }

  function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    emptyCart()
  }

  function addItemToCart(title, imageSrc, quantity) {
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
    <input class="cart-quantity-input" type="number" value="${quantity}">
    <button class="removeItem" type="button" name="button">Törlés</button>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('removeItem')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    emptyCart()
    $('.quantity-selector').val(1);
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

    var email = `
      <h3>Rendelés adatai:</h3>
      <ul>
        <li>Név: ` + fullName + `</li>
        <li>Email: ` + emailAddress + `</li>
        <li>Telefonszám: ` + phoneNumber + `</li>
        <li>Szervezet: ` + organization + `</li>
        <li>Zsinagóga címe: ` + synagogueAddress + `</li>
      </ul>
      <h3>Üzenet:</h3>
      <p>` + message + `</p>
      <h3>Termék(ek):</h3>`;

    var i = 1;
    while (i <= $('.cart-item-title').length) {
      var productTitleInCart = $('.cart-row .cart-item-title').eq(i - 1).text();
      var productValueInCart = $('.cart-row input').eq(i - 1).val();
      var productInCart = `<p> - ` + productTitleInCart + ` x` + productValueInCart + `</p>`;
      email += productInCart;
      i++;
    }

    if (fullName.length >= 5 && email.includes('@') && email.length >= 5 && phoneNumber.length >= 8 && organization.length >= 5 && synagogueAddress.length >= 5 ) {
      alert('Köszönjük a vásárlást!')
      var cartItems = document.getElementsByClassName('yourcart')[0]
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
      }
      $('.order-page').hide();
      sendEmail(email, emailAddress);
      $('.continue-button').show();
      emptyCart()
      $('.order-page input').val('');
      $('.purchase-button').addClass('emptybutton');
    } else {
      alert('Kérjük mindent helyesen töltsön ki!');
    }
  });

  $('.order-page input').keydown(function(){
    var fullName = $('input[name=full-name]').val();
    var email = $('input[name=email]').val();
    var phoneNumber = $('input[name=phone-number]').val();
    var organization = $('input[name=organization]').val();
    var synagogueAddress = $('input[name=synagogue-address]').val();
    var message = $('input[name=message]').val();

    if (fullName.length >= 5 && email.includes('@') && email.length >= 5 && phoneNumber.length >= 8 && organization.length >= 5 && synagogueAddress.length >= 5 ) {
      $('.purchase-button').removeClass('emptybutton');
    } else {
      $('.purchase-button').addClass('emptybutton');
    }
  })
  //EMAIL: sebestyen.greta@zsido.com
  function sendEmail(email, emailAddress){
    Email.send({
    SecureToken : "8fff32d4-543f-41f7-9088-50bc525106b3",
    To : 'sebestyen.greta@zsido.com, ' + emailAddress,
    From : "shlischus.termekek@gmail.com",
    Subject : "Új rendelés",
    Body : email
  })
  }
});
