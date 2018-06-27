'use strict';

(function () {
  var similarFotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarFotoList = document.querySelector('.pictures');

  var getFotoElement = function (foto) {
    var fotoElement = similarFotoTemplate.cloneNode(true);

    fotoElement.querySelector('.picture__img').src = foto.url;
    fotoElement.querySelector('.picture__stat--likes').textContent = foto.likes;
    fotoElement.querySelector('.picture__stat--comments').textContent = foto.description;

    return fotoElement;
  };

  var renderFoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.dataFotos.getFotos.length; i++) {
      fragment.appendChild(getFotoElement(window.dataFotos.getFotos[i]));
    }
    return similarFotoList.appendChild(fragment);
  };
  renderFoto();

})();
