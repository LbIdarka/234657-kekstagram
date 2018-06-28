'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarPhotoList = document.querySelector('.pictures');
  // var miniPhotoLink = document.querySelectorAll('.picture__link');

  var getPhotoElement = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.description;
    photoElement.dataset.currentIndex = '' + window.dataPhotos.getPhotos.indexOf(photo);
    return photoElement;
  };

  var renderPhoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.dataPhotos.getPhotos.length; i++) {
      fragment.appendChild(getPhotoElement(window.dataPhotos.getPhotos[i]));
    }
    return similarPhotoList.appendChild(fragment);
  };
  renderPhoto();

  // var openPreview = function () {
  //   for (var j = 0; j < miniPhotoLink.length; j++) {
  //     miniPhotoLink[j].addEventListener('click', function (evt) {
  //       var target = evt.currentTarget;
  //       var index = target.dataset.currentIndex;
  //       window.preview.renderBigPhoto(index);
  //     });
  //   }
  // };
  // openPreview();

})();
