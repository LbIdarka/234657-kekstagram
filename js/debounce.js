'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fn) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    debounce: debounce
  };

})();
