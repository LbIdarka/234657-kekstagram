'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');

  // Показываем выбранное пользователем фото
  var showFileChooser = function (file) {
    file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      showErrorDownloadPhoto();
    }
  };

  fileChooser.addEventListener('change', showFileChooser);

  // Выводим ошибку загрузки файла неверного типа
  var message = document.querySelector('.upload-error');
  var showErrorDownloadPhoto = function () {
    message.style = 'display: block';
    var messageText = document.createElement('p');
    messageText.classList.add('upload-error__text');
    messageText.textContent = 'Допустимые расширения для загрузки фото: ' + FILE_TYPES.join(', ');
    message.appendChild(messageText);
  };

  window.downloadPhoto = {
    messageReset: function () {
      message.style = 'display: none';
    }
  };

})();
