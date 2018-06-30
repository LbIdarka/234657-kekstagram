'use strict';

(function () {
  var HASHTAGS_NUMBER = 5;
  var HASHTAGS_MIN_SYMBOLS = 2;
  var HASHTAGS_MAX_SYMBOLS = 20;
  var uploadImg = document.querySelector('#upload-select-image');
  var uploadImgLabel = uploadImg.querySelector('#upload-file');
  var uploadImgOpen = uploadImg.querySelector('.img-upload__overlay');
  var uploadImgClose = uploadImg.querySelector('#upload-cancel');
  var hashtagsField = document.querySelector('input[name=hashtags]');
  var commentField = document.querySelector('.text__description');

  // Открытие окна с загрузкой фотографии
  var onEditImgEscPress = function (evt) {
    window.util.isEscEvent(evt, closeEditImg);
  };

  var onEscPressReset = function () {
    document.removeEventListener('keydown', onEditImgEscPress);
  };

  var onEscPressRecovery = function () {
    document.addEventListener('keydown', onEditImgEscPress);
  };

  var openEditImg = function () {
    uploadImgOpen.classList.remove('hidden');
    window.pictureEffects.filterDefault();
    window.pictureResize.defoultValueResize();

    onEscPressRecovery();
  };

    // Закрытие окна с загрузкой фотографии
  uploadImgLabel.addEventListener('change', function () {
    openEditImg();
  });

  var closeEditImg = function () {
    uploadImgOpen.classList.add('hidden');

    uploadImgLabel.removeEventListener('change', openEditImg);
    hashtagsField.removeEventListener('invalid', applyInvalidStyle);
    hashtagsField.classList.remove('invalid-field');
    onEscPressReset();
  };

  uploadImgLabel.addEventListener('change', function () {
    openEditImg();
  });

  uploadImgClose.addEventListener('click', function () {
    closeEditImg();
  });

  // Отмена закрытия по ESC при фокусе текстовых полей
  hashtagsField.addEventListener('focus', onEscPressReset);
  hashtagsField.addEventListener('blur', onEscPressRecovery);
  commentField.addEventListener('focus', onEscPressReset);
  commentField.addEventListener('blur', onEscPressRecovery);


  // Валидация формы
  var checkValidHashtag = function () {
    /* получаем массив из хэштегов */
    var hashtags = hashtagsField.value.toLowerCase().split(/\s+/g);

    /* проверяем повторяющиеся хэш-теги */
    var checkHashtagsUnique = function (element, index, array) {
      return array.indexOf(element) === index;
    };

    /* проверяем на наличие пробелов */
    var checkHashtagsSpace = function (element) {
      return element.indexOf('#', 1) === -1;
    };

    /* проверяем на количество хэштегов */
    if (hashtags.length > HASHTAGS_NUMBER) {
      hashtagsField.setCustomValidity('Краткость - сестра таланта, ' + HASHTAGS_NUMBER + '-ть хэш-тегов - это максимум');
    } else {
      for (var k = 0; k < hashtags.length; k++) {
        if (hashtags[k].charAt(0) !== '#') {
          hashtagsField.setCustomValidity('Попробуйте начать ваш хэш-тег со знака #');
        } else if (hashtags[k].length > HASHTAGS_MAX_SYMBOLS) {
          hashtagsField.setCustomValidity('Будьте скромнее, придумайте хэш-тег менее ' + HASHTAGS_MAX_SYMBOLS + '-и символов');
        } else if (hashtags[k].length < HASHTAGS_MIN_SYMBOLS) {
          hashtagsField.setCustomValidity('Не стесняйтесь, придумайте хэш-тег длинее ' + HASHTAGS_MIN_SYMBOLS + '-х символов');
        } else if (!hashtags.every(checkHashtagsSpace)) {
          hashtagsField.setCustomValidity('Мы за чистоту восприятия! Поcтавьте пробел между вашими хэш-тегами');
        } else if (!hashtags.every(checkHashtagsUnique)) {
          hashtagsField.setCustomValidity('Будьте уникальным, не повторяйте ваши хэш-теги');
        } else {
          hashtagsField.setCustomValidity('');
        }
      }
    }
  };

  hashtagsField.addEventListener('input', checkValidHashtag);

  var applyInvalidStyle = function (evt) {
    evt.target.classList.add('invalid-field');
  };

  hashtagsField.addEventListener('invalid', applyInvalidStyle);


  uploadImg.addEventListener('submit', function (evt) {

    window.backend.upload(new FormData(uploadImg), function (response) {
      uploadImgOpen.classList.add('hidden');
      uploadImg.reset();
    });
    evt.preventDefault();
  });

})();
