'use strict';

(function () {
  var VALUE_RESIZE_MIN = 25;
  var VALUE_RESIZE_MAX = 100;
  var RESIZE_STEP = 25;
  var resize = document.querySelector('.resize');
  var resizeControl = resize.querySelector('.resize__control--value');
  var reduceImg = resize.querySelector('.resize__control--minus');
  var increaseImg = resize.querySelector('.resize__control--plus');
  var valueResizeDefault = resizeControl.value = 100;
  var valueResize = valueResizeDefault;
  var imgPreview = document.querySelector('.img-upload__preview');

  // Вычисляем уменьшение фото
  var resizeMinus = function () {
    valueResize = Math.max(valueResize - RESIZE_STEP, VALUE_RESIZE_MIN);
    resizeControl.value = valueResize + '%';

    return transformImg();
  };

  // Вычисляем увеличение фото
  var resizePlus = function () {
    valueResize = Math.min(valueResize + RESIZE_STEP, VALUE_RESIZE_MAX);
    resizeControl.value = valueResize + '%';

    return transformImg();
  };

  // Добавляем полученные значения в scale фото
  var transformImg = function () {
    var transformImgValue = valueResize / 100;
    imgPreview.style.transform = 'scale(' + transformImgValue + ')';
  };

  // Значения по умолчанию при новом открытии окна
  var defaultValueResize = function () {
    resizeControl.value = valueResizeDefault + '%';
    valueResize = valueResizeDefault;
    imgPreview.style.transform = 'none';
  };

  reduceImg.addEventListener('click', resizeMinus);

  increaseImg.addEventListener('click', resizePlus);

  window.pictureResize = {
    defoultValueResize: defaultValueResize
  };
})();
