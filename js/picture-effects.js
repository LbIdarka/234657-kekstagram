'use strict';

(function () {
  var filterInputs = document.querySelectorAll('.effects__radio');
  var effects = document.querySelector('.img-upload__form');
  var filterPreview = effects.querySelector('.img-upload__preview img');
  var filterInputCheck = document.querySelector('.effects__radio[checked]');
  var filterDefault = 'effects__preview--' + filterInputCheck.value;

  /* Перключение эффектов фотографии */
  var valueToEffectsValue = {
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };

  var setEffects = function (evt) {
    filterPreview.classList = '';
    var filterClass = evt.target.value;
    filterPreview.classList.add(valueToEffectsValue[filterClass]);
    filterPreview.style = 'none';
    window.slider.default();
    window.slider.scaleBox.classList.toggle('hidden', evt.target.value === 'none');
  };

  filterInputs.forEach(function (filterInput) {
    filterInput.addEventListener('change', setEffects);
  });

  /* Изменение глубины эффекта */
  var getValueEffect = function () {
    var getParamEffect = function (a, b) {
      var pinProportionValue = window.scalePinCoordX / window.scaleLineWidth;
      var paramEffect = pinProportionValue * (b - a) + a;

      return paramEffect;
    };

    var effectChrome = effects.querySelector('.effects__preview--chrome');
    var effectSepia = effects.querySelector('.effects__preview--sepia');
    var effectMarvin = effects.querySelector('.effects__preview--marvin');
    var effectPhobos = effects.querySelector('.effects__preview--phobos');
    var effectHeat = effects.querySelector('.effects__preview--heat');

    if (effectChrome) {
      effectChrome.style.filter = 'grayscale(' + getParamEffect(0, 1) + ')';
    }
    if (effectSepia) {
      effectSepia.style.filter = 'sepia(' + getParamEffect(0, 1) + ')';
    }
    if (effectMarvin) {
      effectMarvin.style.filter = 'invert(' + getParamEffect(0, 100) + '%)';
    }
    if (effectPhobos) {
      effectPhobos.style.filter = 'blur(' + getParamEffect(0, 3) + 'px)';
    }
    if (effectHeat) {
      effectHeat.style.filter = 'brightness(' + getParamEffect(1, 3) + ')';
    }
  };


  window.pictureEffects = {
    filterDefault: function () {
      filterPreview.classList.add(filterDefault);
    },
    getValueEffect: function () {
      getValueEffect();
    }
  };

})();
