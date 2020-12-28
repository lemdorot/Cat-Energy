'use strict';

(function () {
  
//    // Mobile menu

  var nav = document.querySelector('.main-nav');
  var burger = document.querySelector('.main-nav__toggle');

  nav.classList.remove('main-nav--nojs');

  function burgerClickHandler() {
    nav.classList.toggle('main-nav--show');
  }

  burger.addEventListener('click', burgerClickHandler);
  
})();