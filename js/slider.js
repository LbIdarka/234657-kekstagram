'use strict';

(function () {
  var MIN_LEVEL_SLIDER = 0;
  var MAX_LEVEL_SLAIDER = 100 + '%';
  var scaleBox = document.querySelector('.scale');
  var scaleLine = scaleBox.querySelector('.scale__line');
  var scalePin = scaleBox.querySelector('.scale__pin');
  var scaleLevel = scaleBox.querySelector('.scale__level');
  /* Получение координат для перемещения пина */
  var movePin = function (evt) {
    var scaleLineCoords = scaleLine.getBoundingClientRect();
    var scaleLineLeft = scaleLineCoords.left;
    window.scaleLineWidth = scaleLineCoords.width;
    var startCoords = evt.clientX;
    window.scalePinCoordX = startCoords - scaleLineLeft;

    if (window.scalePinCoordX < MIN_LEVEL_SLIDER) {
      window.scalePinCoordX = MIN_LEVEL_SLIDER;
    } else if (window.scalePinCoordX > window.scaleLineWidth) {
      window.scalePinCoordX = window.scaleLineWidth;
    }

    scalePin.style.left = window.scalePinCoordX + 'px';
    scaleLevel.style.width = scalePin.style.left;
    window.pictureEffects.getValueEffect();
  };


  /* События, при которых происходит перемещение */
  var onMouseDown = function () {
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      movePin(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      movePin(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var getDefaultSlider = function () {
    scalePin.style.left = MAX_LEVEL_SLAIDER;
    scaleLevel.style.width = MAX_LEVEL_SLAIDER;
  };

  scaleBox.addEventListener('mousedown', onMouseDown);


  window.slider = {
    default: function () {
      getDefaultSlider();
    },
    scaleBox: scaleBox,
    scalePinCoordX: window.scalePinCoordX,
    scaleLineWidth: window.scaleLineWidth
  };

})();
