(function() {
  'use strict';
});

$(document).ready(function() {
  
  // открыть/закрыть мобильное меню начало

  $('.js__toggle').click(function() {
    $(this).toggleClass('menu-toggle--on');
    $('.menu').toggleClass('menu--open');
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".top-line__wrap").length) {
      $('.js__toggle').removeClass('menu-toggle--on');
      $('.menu').removeClass('menu--open');
    }
    e.stopPropagation();
  });

  // открыть/закрыть мобильное меню начало


  // запуск видео начало

  $('.memory__video').click(function(){
    $(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0"  allowfullscreen></iframe>');
  });

  // запуск видео конец


  // плавная прокрутка до блока начало

  $(".menu__link, .header__btn").on("click", function(e){
    var anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
    e.preventDefault();
    return false;
  });

  // плавная прокрутка до блока конец

  // маски для input`ов начало

  $('.form__input--date').mask('00.00.0000');

  $('.form__input--phone').mask('+7 (000) 000-0000');

  // маски для input`ов конец


  // добавить участника в заявку начало

  $('.form__add-user').click(function(){
    var userLength = $('.form__user').length;
    userLength++;
    if (userLength == 10) {
      addUser(userLength);
      $(this).css('visibility', 'hidden');
    } else {
      addUser(userLength);
    }
  });

  // добавить участника в заявку конец


  // удалить участника из заявки начало

  $('body').on('click', '.form__user-close', function(){
    var userLength = $('.form__user').length;
    var userBlock = $(this).parent(".form__user");
    userBlock.remove();
    if (userLength == 10) {
      $('.form__add-user').css('visibility', 'visible');
    };
    price();
  });

  // удалить участника из заявки конец


  // изменение select`ов начало
  $('body').on('change', '.form__select--cat', function() {
    var catKey = ($(':selected', this).attr('data-key'));
    var tt = $(this).parents('.form__user').find('.form__label--distance');
    var dist = $(this).parents('.form__user').find('.form__label--distance option');
    dist.attr('disabled', false);
    dist.attr('selected', false);
    
    dist.each(function(){
      var distKey = $(this).attr('data-key');
      console.log(distKey);
      if (catKey != distKey) {
        $(this).attr('disabled', true);
      } else {
        $(this).attr('selected', 'selected');
      }
    });
    price();
  });

  $('body').on('change', '.form__select--dist', function() {
    price();
  });
  // изменение select`ов начало

  $(".form__select").click(function() {
    $(this).parent('.form__label').toggleClass('form__label--active');
  });


})

function price(){
  var total = 0;
  $('.form__user').each(function(){
    var select = $(this).find('.form__select--dist');
    var price = select.val();
    console.log()
    total = total + +price;
  });
  var text = total + ' руб.';
  $('.form__total span').text(text);
};

function addUser(userLength) {
  var main= document.getElementById("form__user");
  var newElem = document.createElement('div');
  newElem.className = 'form__user';
  newElem.innerHTML = '<div class="form__user-close" title="Удалить"></div> \
  <label class="form__label form__label--user">Участник №' + userLength +' \
    <input class="form__input" type="text" required placeholder="Константинопольский Иван Иванович"> \
  </label> \
  <label class="form__label form__label--cat">Категория<span class="form__arrow"></span> \
    <select class="form__select form__select--cat"> \
      <option value="val-0" data-key="1">Малыши</option> \
      <option value="val-1" data-key="2">Дети</option> \
      <option value="val-2" data-key="3">Взрослые</option> \
      <option value="val-3" data-key="4">Fun Run</option> \
      <option value="val-4" data-key="5">Пенсионеры</option> \
      <option value="val-5" data-key="5">Студенты</option> \
    </select> \
  </label> \
  <label class="form__label form__label--distance">Дистанция<span class="form__arrow"></span> \
    <select class="form__select form__select--dist"> \
      <option value="0" data-price="0" data-key="1">10км <span>бесплатно</span></option> \
      <option value="0" data-price="0" data-key="1">2км <strong>бесплатно</strong></option> \
      <option value="150" data-price="150" data-key="2">10км <strong>150 руб.</strong></option> \
      <option value="150" data-price="150" data-key="2">2км <strong>150 руб.</strong></option> \
      <option value="500" data-price="500" data-key="3">10км - <strong>500 руб.</strong></option> \
      <option value="350" data-price="350" data-key="3">2км - <strong>350 руб.</strong></option> \
      <option value="300" data-price="300" data-key="4">10км <strong>300 руб.</strong></option> \
      <option value="300" data-price="300" data-key="4">2км <strong>300 руб.</strong></option> \
      <option value="350" data-price="350" data-key="5">10км <strong>350 руб.</strong></option> \
      <option value="350" data-price="350" data-key="5">2км <strong>350 руб.</strong></option> \
    </select> \
  </label>';
   
  main.parentNode.appendChild(newElem);
};