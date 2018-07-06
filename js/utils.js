'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    flipCoin: function () {
      return Math.random() - 0.5;
    },

    onError: function (error) {
      var similarErrorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
      var body = document.querySelector('body');
      var errorMessage = similarErrorTemplate.cloneNode(true);
      body.appendChild(errorMessage);
      errorMessage.textContent = error;
      errorMessage.style = ('z-index: 2');
      errorMessage.classList.remove('hidden');
    }
  };
})();
