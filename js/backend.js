'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  // var URL_DATA = URL + '/data';

  // var load = function (onLoad) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.open('GET', URL_DATA);

  //   xhr.addEventListener('load', function () {
  //     onLoad(xhr.response);
  //   });

  //   xhr.send();
  // };

  var onError = function (error) {
    var message = document.querySelector('.upload-error');
    message.style = 'display: block';
    var messageText = document.createElement('p');
    messageText.classList.add('upload-error__text');
    messageText.textContent = error;
    message.appendChild(messageText);
  };

  var upload = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        default:
          error = 'Статус ответа: ' + xhr.status + '' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    upload: upload,
    // load: load
  };

})();
