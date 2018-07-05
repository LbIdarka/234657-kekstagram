'use strict';

(function () {
  var filterInputs = document.querySelectorAll('.effects__radio');
  var effects = document.querySelector('.img-upload__form');
  var filterPreview = effects.querySelector('.img-upload__preview img');
  var filterInputCheck = document.querySelector('.effects__radio[checked]');
  var filterDefaultClass = 'effects__preview--' + filterInputCheck.value;

  // Сброс эффектов и состояния слайдера до дефолтного
  var filterReset = function () {
    filterPreview.style = 'none';
    window.slider.default();
  };

  // Перключение эффектов фотографии
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
    filterReset();
    window.slider.scaleBox.classList.toggle('hidden', evt.target.value === 'none');
  };

  filterInputs.forEach(function (filterInput) {
    filterInput.addEventListener('change', setEffects);
  });

  // Изменение глубины эффекта
  var getValueEffect = function () {
    var getParamEffect = function (a, b) {
      var pinProportionValue = window.scalePinCoordX / window.scaleLineWidth;
      var paramEffect = pinProportionValue * (b - a) + a;

      return paramEffect;
    };

    var depthEffectsMap = {
      'effects__preview--chrome': {
        filter: 'grayscale(',
        minValue: 0,
        maxValue: 1,
        unit: ')'
      },

      'effects__preview--sepia': {
        filter: 'sepia(',
        minValue: 0,
        maxValue: 1,
        unit: ')'
      },

      'effects__preview--marvin': {
        filter: 'invert(',
        minValue: 0,
        maxValue: 100,
        unit: '%)'
      },

      'effects__preview--phobos': {
        filter: 'blur(',
        minValue: 0,
        maxValue: 3,
        unit: 'px)'
      },

      'effects__preview--heat': {
        filter: 'brightness(',
        minValue: 1,
        maxValue: 3,
        unit: ')'
      }
    };

    var effectsName = filterPreview.className;
    var map = depthEffectsMap[effectsName];

    filterPreview.style.filter = map.filter + getParamEffect(map.minValue, map.maxValue) + map.unit;
  };


  window.pictureEffects = {
    filterReset: filterReset,

    filterDefault: function () {
      filterPreview.classList.add(filterDefaultClass);
      window.slider.scaleBox.classList.remove('hidden');
      window.slider.default();
    },

    getValueEffect: getValueEffect
  };

})();
