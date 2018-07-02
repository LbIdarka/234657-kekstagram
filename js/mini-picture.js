'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarPhotoList = document.querySelector('.pictures');

  // var photos = window.dataPhotos.getPhotos;
  var renderBigPhoto = window.preview.renderBigPhoto;

  var getPhotoElement = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      renderBigPhoto(photo);
      var modal = document.querySelector('body');
      modal.classList.add('modal-open');
    });

    return photoElement;
  };

  var renderPhoto = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getPhotoElement(photos[i]));
    }
    return similarPhotoList.appendChild(fragment);
  };

  window.backend.load(renderPhoto, window.util.onError);

})();
