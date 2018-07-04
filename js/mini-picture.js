'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderBigPhoto = window.preview.renderBigPhoto;

  var getPhotoElement = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      renderBigPhoto(photo);
    });

    return photoElement;
  };

  window.miniPicture = {
    getPhotoElement: getPhotoElement
  };

})();
