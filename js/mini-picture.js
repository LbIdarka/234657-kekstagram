'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarPhotoList = document.querySelector('.pictures');

  var photos = window.dataPhotos.getPhotos;
  var renderBigPhoto = window.preview.renderBigPhoto;

  var getPhotoElement = function (index) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    var photo = photos[index];

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.description;

    photoElement.addEventListener('click', function () {
      renderBigPhoto(index);
    });

    return photoElement;
  };

  var renderPhoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.dataPhotos.getPhotos.length; i++) {
      fragment.appendChild(getPhotoElement(i));
    }
    return similarPhotoList.appendChild(fragment);
  };
  renderPhoto();


})();
