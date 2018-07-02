'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var URL_DATA = URL + '/data';
  var OK = 200;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var NOT_FOUND = 404;

  var setLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case OK:
          onLoad(xhr.response);
          break;

        case BAD_REQUEST:
          error = 'Неверный запрос';
          break;

        case UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;

        case NOT_FOUND:
          error = 'Не найдено';
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

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setLoad(onLoad, onError);

    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = setLoad(onLoad, onError);

    xhr.timeout = 100;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
    badRequest: BAD_REQUEST
  };

})();
