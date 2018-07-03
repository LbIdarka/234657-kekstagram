'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarPhotoList = document.querySelector('.pictures');

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

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getPhotoElement(photos[i]));
    }
    return similarPhotoList.appendChild(fragment);
  };

  var photos = [];

  var loadPhotos = function (data) {
    photos = data;
    window.photos = data;
    updatePhotos();
    filtersPhoto.classList.remove('img-filters--inactive');
  };

  var updatePhotos = window.debounce.debounce(function () {
    renderPhotos(photos);
  });

  var filtersPhoto = document.querySelector('.img-filters');

  var showPopularPhotos = window.debounce.debounce(function () {
    photos = window.photos;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  });

  var showNewPhotos = window.debounce.debounce(function () {
    var photosCopy = window.photos.slice();
    var newPhotos = photosCopy.sort(window.util.flipCoin).slice(0, 10);
    photos = newPhotos;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  });

  var showDiscussedPhotos = function () {
    var photosCopy = window.photos.slice();
    var discussedPhoto = photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    photos = discussedPhoto;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  };

  var classToFilter = {
    'filter-popular': showPopularPhotos,
    'filter-new': showNewPhotos,
    'filter-discussed': showDiscussedPhotos,
  };

  var filterForm = filtersPhoto.querySelector('.img-filters__form');
  var filterBtn = filtersPhoto.querySelectorAll('.img-filters__button');

  var showFiltersPhoto = function (evt) {
    filterBtn.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });
    var idFilter = evt.target.id;
    evt.target.classList.add('img-filters__button--active');
    classToFilter[idFilter]();
  };

  filterForm.addEventListener('click', function (evt) {
    showFiltersPhoto(evt);
  });

  window.backend.load(loadPhotos, window.util.onError);

})();
