'use strict';

(function () {
  window.random = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    getRandomElement: function (strings) {
      return strings[Math.floor(Math.random() * strings.length)];
    },

    mixArr: function () {
      return Math.random() - 0.5;
    }
  };
})();
