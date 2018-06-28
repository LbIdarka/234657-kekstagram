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

    getRandomElement: function (strings) {
      return strings[Math.floor(Math.random() * strings.length)];
    },

    flipCoin: function () {
      return Math.random() - 0.5;
    }
  };
})();